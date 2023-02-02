/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: Fix above
import { S3 } from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default function uploadCsv(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const file = req.body;

    const BUCKET_NAME = process.env.S3_BUCKET_NAME;

    const params = {
      Bucket: String(BUCKET_NAME),
      Key: `${String(uuidv4())}.csv`,
      Body: file,
    };

    s3.upload(params, function (error: unknown, data: any) {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(data);
      }
    });
  }

  res.status(200);
}
