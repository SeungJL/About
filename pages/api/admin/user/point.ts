import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { isPreviliged } from "../../../../libs/utils/authUtils";
import { User } from "../../../../models/user";

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
      await User.updateMany({}, { $set: { point: 0 } });
      res.status(200).send({});
      break;
  }
}
