import express from "express";
import { generatedUploadURL } from "./s3.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/s3Url', async (req, res) => {
    const url = await generatedUploadURL();
    res.send({ url });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));