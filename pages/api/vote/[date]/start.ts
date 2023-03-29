import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect";
import { getToday } from "../../../../libs/utils/dateUtils";
import { findOneVote } from "../../../../services/voteService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  await dbConnect();
  console.log(getToday().toDate());
  const vote = findOneVote(getToday().toDate());
  switch (method) {
    case "GET":
      break;
  }
}
