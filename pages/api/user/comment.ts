import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import dbConnect from "../../../libs/dbConnect";
import { User } from "../../../models/user";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session = await getServerSession({ req, res }, authOptions);
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const comments = await User.find({}, "comment");
        res.status(200).json({ comments });
      } catch (err) {
        res.status(500).send(err);
      }
      break;

    case "POST":
      const { comment } = req.body;

      try {
        await User.updateOne(
          { uid: session.uid },
          { $set: { comment } },
          { strict: false }
        );

        res.status(200).send(true);
      } catch (err) {
        res.status(500).send(err);
      }
      break;
  }
}
