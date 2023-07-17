import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../../libs/dbConnect";
import { User } from "../../../../../models/user";
import { IUser } from "../../../../../types/user/user";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser>
) {
  const uid = req.query.id as string;
  const { method } = req;
  const token = await getToken({ req, secret });

  // if (!token || !isPreviliged(token.role as string)) {
  //   res.status(401).end()
  //   return
  // }

  await dbConnect();

  switch (method) {
    case "GET":
      const user = await User.findOne({ uid: uid });

      res.status(200).json(user);
      break;
    default:
      res.status(400).end();
      break;
  }
}
