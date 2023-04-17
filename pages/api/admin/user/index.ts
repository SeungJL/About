import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { isPreviliged } from "../../../../libs/utils/authUtils";
import { User } from "../../../../models/user";
import { IUser } from "../../../../types/user";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();

  const token = await getToken({ req, secret });
  if (!token || !isPreviliged(token.role.toString())) {
    res.status(401).end();
    return;
  }
  if (!token) {
    res.status(401).end();
    return;
  }

  switch (method) {
    case "GET": {
      const users = await User.find({});
      res.status(200).json(users);
      break;
    }

    case "POST": {
      const { profile }: { profile: IUser } = req.body;

      await User.updateOne({ uid: profile.uid }, profile);

      res.status(200).json({});
      break;
    }
    default:
      res.status(400).end();
      break;
  }
}
