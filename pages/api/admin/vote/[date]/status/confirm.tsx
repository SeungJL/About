import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../../libs/dbConnect";
import { confirm } from "../../../../../../services/voteService";

const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const secret = req.headers.secret;
  const dateStr = req.query.date as string;

  await dbConnect();

  switch (method) {
    case "PATCH":
      // if (secret !== SECRET) {
      //   return res.status(403).end();
      // }

      confirm(dateStr);
      return res.status(204).end();
  }

  return res.status(404).end();
}
