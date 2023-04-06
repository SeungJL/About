import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { isPreviliged } from "../../../../libs/utils/authUtils";
import { now } from "../../../../libs/utils/dateUtils";
import { Vote } from "../../../../models/vote";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const token = await getToken({ req, secret });

  if (!token || !isPreviliged(token.role as string)) {
    res.status(401).end();
    return;
  }

  await dbConnect();

  switch (method) {
    case "DELETE":
      const day = now().add(2, "days").toDate();
      await Vote.deleteMany({ date: { $gte: day } });
      return res.status(204).end();
  }

  return res.status(404).end();
}
