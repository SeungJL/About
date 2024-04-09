import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/backend/dbConnect";
import { Place } from "../../../models/place";

import { IPlace } from "../../../types/models/study/studyDetail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPlace[]>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const places = await Place.find({ status: "active" });
      return res.status(200).json(places);
    case "POST":
      const { body } = req;
      const place = body as IPlace;

      await new Place(place).save();
      return res.status(201).end();
  }

  return res.status(400).end();
}
