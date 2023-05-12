import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../libs/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const secret = process.env.NEXTAUTH_SECRET;

  await dbConnect();

  switch (method) {
    case "GET":
      const jwt = await getToken({ req, secret, raw: true });

      console.log(jwt);
      res.status(200).json(jwt);
      break;
  }
}
