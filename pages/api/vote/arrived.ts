import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../libs/dbConnect";
import { Vote } from "../../../models/vote";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { memo },
  } = req;

  const token = await getToken({ req, secret });
  const _id = token.id;

  await dbConnect();

  switch (method) {
    case "GET":
      const { startDay, endDay } = req.query as {
        startDay: string;
        endDay: string;
      };

      const result = await Vote.collection
        .aggregate([
          {
            $match: {
              date: {
                $gte: dayjs(startDay).toDate(),
                $lt: dayjs(endDay).toDate(),
              },
            },
          },
          {
            $unwind: "$participations",
          },
        ])
        .toArray();

      console.log(result);
  }

  return res.status(400).end();
}
