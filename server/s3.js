import aws from "aws-sdk";
import dotenv from "dotenv";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "eu-north-1";
const bucketName = "test-app-test-01";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
});

export async function generatedUploadURL() {
    const rawBytes = await randomBytes(16);
    const imgName =  rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imgName,
        Expires: 60
    });

    const uploadUrl = await s3.getSignedUrl('putObject', params);
    return uploadUrl;
}