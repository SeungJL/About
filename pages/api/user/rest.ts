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
    case "POST":
      {
        const { info } = req.body;
        await User.updateOne({ uid: token.uid }, { $set: { rest: info } });
        res.status(200).send({});
        try {
        } catch (err) {
          res.status(500).send(err);
        }
      }
      break;
  }
}
