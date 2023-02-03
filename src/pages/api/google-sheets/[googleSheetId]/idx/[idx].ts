/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: Fix above
import type { NextApiRequest, NextApiResponse } from "next";
import { GOOGLE_API_URL } from "../../../../../utils/constants";

export default async function googleSheetIdx(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { googleSheetId, idx: idxStr } = req.query;

    if (!googleSheetId) {
      res.status(400).json("No Google Sheet ID was provided");
    }
    const id = String(googleSheetId);

    const idx = parseInt(String(idxStr), 10);
    if (isNaN(idx)) {
      res.status(400).json("Invalid index was provided");
    }

    const response = await fetch(
      `${GOOGLE_API_URL}/${id}?key=${process.env.GOOGLE_API_KEY ?? ""}`
    );

    if (response.status !== 200) {
      res.status(response.status);
    }

    const data: any = await response.json();
    const sheetTitle: string = data.sheets[idx].properties.title as string;

    const dataResponse = await fetch(
      `${GOOGLE_API_URL}/${id}/values/${sheetTitle}?key=${
        process.env.GOOGLE_API_KEY ?? ""
      }`
    );
    const dataData = await dataResponse.json();

    res.status(200).json(dataData);
  }

  res.status(200);
}
