import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../libs/dbConnect";
import { Vote } from "../../../../../models/vote";

const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const dateStr = req.query.date;

  await dbConnect();

  switch (method) {
    case "DELETE":
      const day = dayjs(dateStr.toString()).add(2, "days").toDate();
      await Vote.deleteMany({ date: { $gte: day } });
      return res.status(204).end();
  }

  return res.status(404).end();
}
