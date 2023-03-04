import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { dateToDayjs, now, strToDate } from "../../../../libs/utils/dateUtils";
import { IVote, Vote } from "../../../../models/vote";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { memo },
  } = req;
  const dateStr = req.query.date as string;
  const dayjsDate = strToDate(dateStr);
  // .add(1, "day");
  const date = dayjsDate.toDate();

  const token = await getToken({ req, secret });
  const _id = token.id;

  await dbConnect();

  let vote;

  switch (method) {
    case "GET":
      const arriveInfo = [];

      vote = await (
        await Vote.findOne({ date })
      ).populate(["participations.attendences.user"]);
      if (!vote) return res.status(404).end();
      vote.participations.forEach((participation) => {
        if (participation.status === "open") {
          participation.attendences.forEach((att) => {
            if (att.arrived) {
              arriveInfo.push({
                user: att.user,
                memo: att.memo,
              });
            }
          });
        }
      });
      return res.status(200).json(arriveInfo);

    case "PATCH":
      vote = await Vote.findOne({ date });
      if (!vote) return res.status(404).end();

      const currentTime = now();

      vote.participations.forEach((participation) => {
        participation.attendences.forEach((att) => {
          if (att.user.toString() === _id.toString()) {
            const { start, end } = att.time;

            const startable = dateToDayjs(start).subtract(2, "hour");
            const endable = dateToDayjs(end);

            if (startable <= currentTime && currentTime <= endable) {
              att.arrived = currentTime.toDate();
              att.memo = memo;
            } else {
              return res.status(400).end();
            }
          }
        });
      });

      await vote.save();
      return res.status(204).end();
  }

  return res.status(400).end();
}
