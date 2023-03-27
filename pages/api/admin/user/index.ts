import { NextApiRequest, NextApiResponse } from "next";
import { getToday } from "../../../../libs/utils/dateUtils";
import dbConnect from "../../../../libs/dbConnect";
import { IUserStatistic } from "../../../../types/statistics";
import { User } from "../../../../models/user";
import { Attendence } from "../../../../models/attendence";

const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const secret = req.headers.secret;

  await dbConnect();

  switch (method) {
    case "PATCH":
      if (secret !== SECRET) {
        return res.status(403).end();
      }

      const users = await User.find({
        role: { $in: ["member", "previliged"] },
      });

      const aggResult: IUserStatistic[] = await Attendence.aggregate([
        {
          $match: {
            date: {
              $gte: getToday().startOf("month").toDate(),
              $lt: getToday().endOf("month").add(1, "day").toDate(),
            },
            "participants.0": { $exists: true },
          },
        },
        {
          $project: {
            _id: 0,
            date: true,
            participants: true,
            process: true,
            friends: "$participants.user",
          },
        },
        {
          $unwind: "$participants",
        },
        {
          $project: {
            user_id: "$participants.user",
            time: "$participants.time",
            place: "$participants.place",
            friends: {
              $filter: {
                input: "$friends",
                as: "f",
                cond: { $ne: ["$$f", "$participants.user"] },
              },
            },
            date: true,
            process: true,
          },
        },
        {
          $group: {
            _id: "$user_id",
            attendences: {
              $push: {
                date: "$date",
                time: "$time",
                place: "$place",
                process: "$process",
                friends: "$friends",
              },
            },
          },
        },
        {
          $project: {
            attendences: "$attendences",
            voteCnt4Week: { $size: "$attendences" },
            openCnt4Week: {
              $size: {
                $filter: {
                  input: "$attendences",
                  as: "att",
                  cond: { $eq: ["$$att.process", "open"] },
                },
              },
            },
            voteCnt2Week: {
              $size: {
                $filter: {
                  input: "$attendences",
                  as: "att",
                  cond: {
                    $gte: [
                      "$$att.date",
                      getToday().subtract(2, "week").toDate(),
                    ],
                  },
                },
              },
            },
            openCnt2Week: {
              $size: {
                $filter: {
                  input: "$attendences",
                  as: "att",
                  cond: {
                    $and: [
                      {
                        $gte: [
                          "$$att.date",
                          getToday().subtract(2, "week").toDate(),
                        ],
                      },
                      { $eq: ["$$att.process", "open"] },
                    ],
                  },
                },
              },
            },
            voteCnt1Week: {
              $size: {
                $filter: {
                  input: "$attendences",
                  as: "att",
                  cond: {
                    $gte: [
                      "$$att.date",
                      getToday().subtract(1, "week").toDate(),
                    ],
                  },
                },
              },
            },
            openCnt1Week: {
              $size: {
                $filter: {
                  input: "$attendences",
                  as: "att",
                  cond: {
                    $and: [
                      {
                        $gte: [
                          "$$att.date",
                          getToday().subtract(1, "week").toDate(),
                        ],
                      },
                      { $eq: ["$$att.process", "open"] },
                    ],
                  },
                },
              },
            },
          },
        },
      ]);

      const promisses = users.map((user) => {
        const statistic = aggResult.find(
          (agg) => agg._id.toString() === user._id.toString()
        );

        if (statistic) {
          return User.updateOne({ _id: user._id }, { $set: { statistic } });
        } else {
          return User.updateOne(
            { _id: user._id },
            {
              $set: {
                statistic: {
                  attendences: [],
                  voteCnt4Week: 0,
                  openCnt4Week: 0,
                  voteCnt2Week: 0,
                  openCnt2Week: 0,
                  voteCnt1Week: 0,
                  openCnt1Week: 0,
                } as IUserStatistic,
              },
            }
          );
        }
      });
      await Promise.all(promisses);

      res.status(200).end();
      break;
    default:
      res.status(400).end();
      break;
  }
}
