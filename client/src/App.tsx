import { useState, useRef } from 'react'
import './App.css'

type selectedFileType = File | null;

function App() {

  const [selectedFile, setSelectedFile] = useState<selectedFileType>(null);
  const imgRef = useRef<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {

      // get secure url from our server
      const { url } = await fetch('http://localhost:3000/s3Url').then(res => res.json());
      console.log(url); 

      // post the image directly to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: selectedFile,
      });

      const imageUrl = url.split('?')[0];
      console.log(imageUrl);

      imgRef.current.src = imageUrl;
      
    }
  }

  return (
    <div>
      <h1>Image Upload Form</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {selectedFile && (
        <div>
          <h2>Selected File:</h2>
          <p>Name: {selectedFile.name}</p>
          <p>Type: {selectedFile.type}</p>
          <p>Size: {selectedFile.size} bytes</p>
        </div>
      )}
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' alt='Image' ref={imgRef}/>
    </div>
  )
}

export default App