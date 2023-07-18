import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/backend/dbConnect";
import { strToDate } from "../../../../libs/dateUtils";
import { findOneVote } from "../../../../services/voteService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dateStr = req.query.date.toString();
  const dayjsDate = strToDate(dateStr);
  const date = dayjsDate.toDate();

  const { method } = req;
  await dbConnect();
  const vote = await findOneVote(date);

  switch (method) {
    case "GET":
      const result = [];
      vote.participations.map((participation) => {
        if (participation.status === "open" && participation.startTime) {
          const openInfo = {
            place_id: participation.place._id,
            startTime: participation.startTime,
          };
          result.push(openInfo);
        }
      });
      res.status(200).json(result);
      break;
    default:
      res.status(500).send({});
  }
}
