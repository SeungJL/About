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

      const userArrivedInfo = await Vote.collection
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
          {
            $unwind: "$participations.attendences",
          },
          {
            $lookup: {
              from: "places",
              localField: "participations.place",
              foreignField: "_id",
              as: "place",
            },
          },
          {
            $project: {
              date: "$date",
              attendence: "$participations.attendences",
              place: "$place",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "attendence.user",
              foreignField: "_id",
              as: "attendence.user",
            },
          },
          {
            $unwind: "$place",
          },
          {
            $unwind: "$attendence.user",
          },
          {
            $project: {
              date: "$date",
              uid: "$attendence.user.uid",
              placeId: "$place._id",
              location: "$place.location",
              arrived: "$attendence.arrived",
            },
          },
        ])
        .toArray();

      // console.log(userArrivedInfo);

      const results = userArrivedInfo.reduce((acc, obj) => {
        const date = dayjs(obj.date).format("YYYY-MM-DD").toString();
        const placeId = obj.placeId;
        const uid = obj.uid;

        const idx = acc.findIndex((el) => el.date === date);
        if (idx === -1) {
          acc.push({ date, arrivedInfoList: [] });
        } else {
          acc[idx].arrivedInfoList.push({ placeId, uid });
        }

        return acc;
      }, []);

      results.forEach((result) => {
        result.arrivedInfoList = result.arrivedInfoList.reduce((acc, obj) => {
          const placeId = obj.placeId.toString();
          const uid = obj.uid;
          const idx = acc.findIndex((el) => el.placeId === placeId);

          if (idx === -1) {
            acc.push({ placeId, arrivedInfo: [] });
          } else {
            acc[idx].arrivedInfo.push({ uid });
          }

          return acc;
        }, []);
      });

      return res.status(200).json(results);
  }

  return res.status(400).end();
}
