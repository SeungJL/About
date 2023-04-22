import { Dayjs } from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { dateToDayjs, now, strToDate } from "../../../../libs/utils/dateUtils";
import { findOneVote } from "../../../../services/voteService";
import { IUser } from "../../../../types/user";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { memo },
  } = req;
  const dayjs = require("dayjs");
  const dateStr = req.query.date as string;
  const dayjsDate = strToDate(dateStr);
  const date = dayjsDate.toDate();

  const token = await getToken({ req, secret });
  const _id = token.id;

  await dbConnect();

  const vote = await findOneVote(date);
  if (!vote) return res.status(404).end();

  switch (method) {
    case "GET":
      const arriveInfo = [];

      vote.participations.forEach((participation) => {
        const arriveForm = {};
        arriveForm[participation.place.fullname] = [];
        if (participation.status === "open") {
          participation.attendences.forEach((att) => {
            if (att.arrived) {
              arriveForm[participation.place.fullname].push({
                location: participation.place.fullname,
                spaceId: participation.place._id,
                uid: (att.user as IUser)?.uid,
                arrived: att.arrived,
              });
            }
          });
        }
        arriveInfo.push(arriveForm);
      });

      return res.status(200).json(arriveInfo);
    case "PATCH":
      const currentTime = now().add(9, "hour");

      vote.participations.forEach((participation) => {
        participation.attendences.forEach((att) => {
          if (
            (att.user as IUser)._id.toString() === _id.toString() &&
            att.firstChoice
          ) {
            const { start, end } = att.time;
            const startable = dayjs(start).add(8, "hour");
            const endable = dayjs(end).add(9, "hour");
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
