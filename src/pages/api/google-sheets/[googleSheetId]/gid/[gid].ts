/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: Fix above
import type { NextApiRequest, NextApiResponse } from "next";
import { GOOGLE_API_URL } from "../../../../../utils/constants";

export default async function googleSheetGid(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { googleSheetId, gid } = req.query;

    if (!googleSheetId || !gid) {
      res.status(400).json("No Google Sheet ID was provided");
    }

    const id = String(googleSheetId);
    const stringGid = String(gid);
    const sheetId = Number.parseInt(stringGid, 10);

    if (!id || !stringGid || Number.isNaN(sheetId)) {
      res
        .status(400)
        .json("The type or format of googleSheetId and gid provided is wrong");
    }

    const response = await fetch(
      `${GOOGLE_API_URL}/${id}?key=${process.env.GOOGLE_API_KEY ?? ""}`
    );

    if (response.status !== 200) {
      res.status(response.status);
    }

    const data: any = await response.json();
    const sheet = data.sheets.find((sheet: any) => {
      return sheet.properties.sheetId === sheetId;
    });
    if (!sheet) {
      res
        .status(400)
        .json("Google Sheet cannot be found with that Sheet ID (gid)");
    }
    const sheetTitle = sheet.properties.title as string;

    const dataResponse = await fetch(
      `${GOOGLE_API_URL}/${id}/values/${sheetTitle}?key=${
        process.env.GOOGLE_API_KEY ?? ""
      }`
    );
    const dataData = await dataResponse.json();
    res.status(200).json({ ...dataData, title: data.properties.title });
  }

  res.status(200);
}
