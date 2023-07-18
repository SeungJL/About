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
        const avatar = await User.findOne({ uid: token.uid }, "avatar");

        res.status(200).json(avatar);
      } catch (err) {
        res.status(500).send(err);
      }
      break;
    case "POST":
      let { type, bg } = req.body;

      try {
        await User.updateOne(
          { uid: token.uid },
          {
            $set: {
              avatar: {
                type,
                bg,
              },
            },
          }
        );
        ``;
        res.status(200).send({});
      } catch (err) {
        console.error(err);
        res.status(500).send({});
      }
      break;
  }
}
