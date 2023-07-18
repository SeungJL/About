import { NextApiRequest, NextApiResponse } from "next";
import { strToDate } from "../../../../../../helpers/dateHelpers";
import dbConnect from "../../../../../../libs/backend/dbConnect";
import { Vote } from "../../../../../../models/vote";

const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const secret = req.headers.secret;
  const dateStr = req.query.date as string;

  const date = strToDate(dateStr).toDate();

  await dbConnect();

  switch (method) {
    case "PATCH":
      if (secret !== SECRET) {
        return res.status(403).end();
      }

      const vote = await Vote.findOne({ date });

      vote.participations.forEach((participation) => {
        if (participation.attendences.length === 0) {
          participation.status = "dismissed";
        }
      });

      await vote.save();
      return res.status(204).end();
  }

  return res.status(404).end();
}
