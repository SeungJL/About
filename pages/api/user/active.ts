import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../libs/backend/dbConnect";
import { User } from "../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.NEXTAUTH_SECRET;

  const { method } = req;
  const token = await getToken({ req, secret });
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const isActive = await User.findOne({ uid: token.uid }, "isActive");
        res.status(200).json({ isActive });
      } catch (err) {
        res.status(500).send(err);
      }
      break;
  }
}
