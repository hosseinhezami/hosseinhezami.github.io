import { v4 as uuidv4 } from "uuid";
import { FileReq } from "@_types/nft";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { addressCheckMiddleware, pinataApiKey, pinataSecretApiKey, withSession } from "./utils";
import FormData from "form-data";
import axios from "axios";
import pinataSDK from "@pinata/sdk";
// const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK('5c4a0e6ee96bf5b06d0a', 'b639b61e1ee7c4915488242b8d1164a4cc0438de4cbbff474892e4ca34b7eeed');

export default withSession(async (
  req: NextApiRequest & {session: Session}, 
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const {
      bytes,
      fileName,
      contentType
    } = req.body as FileReq;

    if (!bytes || !fileName || !contentType) {
      return res.status(422).send({message: "Image data are missing"});
    }

    await addressCheckMiddleware(req, res);

    const buffer = Buffer.from(Object.values(bytes));
    const formData = new FormData();

    formData.append(
      "file",
      buffer, {
        contentType,
        filename: fileName + "-" + uuidv4()
      }
    );

    // const formData = new FormData();
    // const src = "path/to/file.png";
    
    // const file = fs.createReadStream(src)
    // formData.append('file', file)
    
    // const metadata = JSON.stringify({
    //   name: 'File name',
    // });
    // formData.append('pinataMetadata', metadata);
    
    // const options = JSON.stringify({
    //   cidVersion: 0,
    // })
    // formData.append('pinataOptions', options);

    try{
      const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyY2M3M2UwYy1kMzg3LTRkMmYtODA4MC1jZjhjY2RmYjc3NjYiLCJlbWFpbCI6InRldGFuZXgudGVjaG5pY2FsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1YzRhMGU2ZWU5NmJmNWIwNmQwYSIsInNjb3BlZEtleVNlY3JldCI6ImI2MzliNjFlMWVlN2M0OTE1NDg4MjQyYjhkMTE2NGE0Y2MwNDM4ZGU0Y2JiZmY0NzQ4OTJlNGNhMzRiN2VlZWQiLCJpYXQiOjE2NzQ5ODEyNzF9.0XGTgMeqAvdfv-dIkmWCrHyf30hcvICpC4T29LLuJ0E'
        }
      });
      return res.status(200).send(fileRes.data);
      console.log(fileRes.data);
    } catch (error) {
      return res.status(422).send({message: "Invalid endpoint"});
      console.log(error);
    }


    // const readableStreamForFile = fs.createReadStream('./yourfile.png');
    // const options = {
    //     pinataMetadata: {
    //         name: MyCustomName,
    //         keyvalues: {
    //             customKey: 'customValue',
    //             customKey2: 'customValue2'
    //         }
    //     },
    //     pinataOptions: {
    //         cidVersion: 0
    //     }
    // };
    // pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //     //handle results here
    //     console.log(result);
    // }).catch((err) => {
    //     //handle error here
    //     console.log(err);
    // });

    // const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    //   maxBodyLength: Infinity,
    //   headers: {
    //     "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyY2M3M2UwYy1kMzg3LTRkMmYtODA4MC1jZjhjY2RmYjc3NjYiLCJlbWFpbCI6InRldGFuZXgudGVjaG5pY2FsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1YzRhMGU2ZWU5NmJmNWIwNmQwYSIsInNjb3BlZEtleVNlY3JldCI6ImI2MzliNjFlMWVlN2M0OTE1NDg4MjQyYjhkMTE2NGE0Y2MwNDM4ZGU0Y2JiZmY0NzQ4OTJlNGNhMzRiN2VlZWQiLCJpYXQiOjE2NzQ5ODEyNzF9.0XGTgMeqAvdfv-dIkmWCrHyf30hcvICpC4T29LLuJ0E', 
    //     pinata_api_key: '5c4a0e6ee96bf5b06d0a',
    //     pinata_secret_api_key: 'b639b61e1ee7c4915488242b8d1164a4cc0438de4cbbff474892e4ca34b7eeed'
    //   }
    // });

    // return res.status(200).send(fileRes.data);
  } else {
    return res.status(422).send({message: "Invalid endpoint"});
  }
})