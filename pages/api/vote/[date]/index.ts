import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { strToDate } from "../../../../libs/utils/dateUtils";
import dbConnect from "../../../../libs/dbConnect";
import { IPlace, Place } from "../../../../models/place";
import { IUser } from "../../../../models/user";
import { IAttendence, IVote, Vote } from "../../../../models/vote";
import { findOneVote } from "../../../../services/voteService";
import { IplaceInfo } from "../../../../components/utils/placeSelector";
import { IVoteStudyInfo } from "../../../../types/study";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVote>
) {
  const { method } = req;
  const { place, subPlace, start, end }: IVoteStudyInfo = req.body;
  const dateStr = req.query.date as string;
  const date = strToDate(dateStr).toDate();
  const token = await getToken({ req, secret });
  await dbConnect();

  let vote = await findOneVote(date);
  if (!vote) {
    const places = await Place.find({ status: "active" });
    const participants = places.map((place) => {
      return {
        place: place._id,
        attendences: [],
        absences: [],
        invitations: [],
        status: "pending",
      } as any;
    });

    await Vote.create({
      date,
      participations: participants,
      regularMeeting: {
        enable: false,
      },
      agg: {
        invited: [],
        cancelled: [],
        voted: [],
      },
    });

    vote = await findOneVote(date);
  }

  const isVoting = vote.participations
    .flatMap((participation) =>
      participation.attendences.map((attendence) => {
        return (attendence.user as IUser)?._id;
      })
    )
    .find((ObjId) => String(ObjId) === token.id);

  switch (method) {
    case "GET":
      return res.status(200).json(vote);
    case "POST":
      if (isVoting) {
        return res.status(204).end();
      }

      let isOnlyTime = false;
      if (!place) {
        isOnlyTime = true;
      }
      const attendence = {
        time: { start: start, end: end },
        user: token.id,
      } as IAttendence;
      vote.participations = vote.participations.map((participation) => {
        const placeId = (participation.place as IPlace)._id.toString();
        const subPlaceIdArr = subPlace?.map((place) => place._id);
        if (isOnlyTime) {
          return {
            ...participation,
            attendences: [
              ...participation.attendences,
              {
                ...attendence,
              },
            ],
          };
        }
        if (placeId === place._id) {
          return {
            ...participation,
            attendences: [
              ...participation.attendences,
              { ...attendence, firstChoice: true },
            ],
          };
        } else if (subPlaceIdArr.includes(placeId)) {
          return {
            ...participation,
            attendences: [
              ...participation.attendences,
              { ...attendence, firstChoice: false },
            ],
          };
        }
        return participation;
      });

      await vote.save();
      return res.status(204).end();
    case "PATCH":
      vote.participations.map((participation) => {
        participation.attendences.map((attendance) => {
          if ((attendance.user as IUser)?.uid === token.uid) {
            attendance.time.start = start;
            attendance.time.end = end;
          }
        });
      });

      await vote.save();
      return res.status(204).end();
      break;
    case "DELETE":
      if (!isVoting) {
        return res.status(204).end();
      }
      vote.participations = vote.participations.map((participation) => ({
        ...participation,
        attendences: participation.attendences.filter((attendence) => {
          return (
            (attendence.user as IUser)?.uid.toString() !== token.uid.toString()
          );
        }),
      }));

      await vote.save();
      return res.status(204).end();
  }
  return res.status(400).end();
}
