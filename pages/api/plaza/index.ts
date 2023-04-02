import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import { Plaza } from "../../../models/plaza";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const plazaData = await Plaza.find();
      res.status(200).json(plazaData);
      break;
    case "POST":
      try {
        const { plaza } = req.body;

        await Plaza.create(plaza);

        res.send(200);
      } catch (err) {
        res.status(500).send({});
      }
      break;
  }
}
