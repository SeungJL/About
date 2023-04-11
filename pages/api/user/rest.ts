import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import { User } from "../../../models/user";
import { getToken } from "next-auth/jwt";

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
        const { type, startDate, endDate, content } = req.body;
        try {
        } catch (err) {
          res.status(500).send(err);
        }
      }
      break;
  }
}
