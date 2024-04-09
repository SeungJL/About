import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../libs/backend/dbConnect";
import { getProfile } from "../../../libs/backend/oauthUtils";
import { User } from "../../../models/user";
import { IUser } from "../../../types/models/userTypes/userInfoTypes";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser>
) {
  const { method } = req;
  const token = await getToken({ req, secret });

  if (!token || !token.uid || !token.accessToken) {
    res.status(401).end();
    return;
  }

  await dbConnect();

  switch (method) {
    case "GET":
      const targetUser = await User.findOne({ uid: token.uid });
      res.status(200).json(targetUser);
      break;
    case "POST":
      const registerForm = req.body;
      await User.updateOne({ uid: token.uid }, { $set: registerForm });
      const undatedUser = await User.findOne({ uid: token.uid });
      res.status(200).json(undatedUser);
      break;
    case "PATCH":
      const profile = await getProfile(
        token.accessToken as string,
        token.uid as string
      );

      if (!profile) {
        res.status(500).end();
        return;
      }

      await User.updateOne({ uid: token.uid }, { $set: profile });

      res.status(200).json(await User.findOne({ uid: token.uid }));
      break;
    default:
      res.status(400).end();
      break;
  }
}
