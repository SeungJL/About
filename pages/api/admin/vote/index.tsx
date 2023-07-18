import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { isPreviliged } from "../../../../libs/backend/authUtils";
import dbConnect from "../../../../libs/backend/dbConnect";
import { now } from "../../../../libs/dateUtils";
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
