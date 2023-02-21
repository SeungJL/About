import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { isMember } from "../../../libs/utils/authUtils";
import { getToday, getInterestingDate } from "../../../libs/utils/dateUtils";
import dbConnect from "../../../libs/dbConnect";
import { getProfile } from "../../../libs/utils/oauthUtils";
import { Attendence } from "../../../models/attendence";
import { IUser, User } from "../../../models/user";
import { UserAttendenceInfo } from "../../../models/userAttendenceInfo";

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
    case "POST":
      await User.updateMany({}, { $set: { status: "active" } });
      const registerForm = req.body;
      await User.updateOne({ uid: token.uid }, { $set: registerForm });
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
