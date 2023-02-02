/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: Fix above
import { S3 } from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import csvParser from "csv-parser";
import { Readable } from "stream";

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default function csv(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query;

    const BUCKET_NAME = process.env.S3_BUCKET_NAME;

    const params = {
      Bucket: String(BUCKET_NAME),
      Key: `${String(id)}`,
    };

    s3.getObject(params, function (error: unknown, data: any) {
      if (error) {
        res.status(400).json(error);
      } else {
        // const arrays = data.Body;
        // res.status(200).json(arrays);
        const results: Array<Record<string, string>> = [];

        const dataBody: string = data.Body;
        const buffer = new Buffer(dataBody, "binary");
        const stream = Readable.from(buffer);

        stream
          .pipe(csvParser())
          .on("data", (data: Record<string, string>) => results.push(data))
          .on("end", () => {
            res.status(200).json(results);
          });
      }
    });
  }

  res.status(200);
}
