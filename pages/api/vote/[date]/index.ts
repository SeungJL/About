import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { strToDate } from "../../../../helpers/dateHelpers";
import dbConnect from "../../../../libs/backend/dbConnect";
import { Place } from "../../../../models/place";
import { Vote } from "../../../../models/vote";
import { findOneVote } from "../../../../services/voteService";
import { IStudyParticipate } from "../../../../types/study/study";
import {
  IAttendance,
  IPlace,
  IVote,
} from "../../../../types/study/studyDetail";
import { IUser } from "../../../../types/user/user";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVote>
) {
  const { method } = req;
  const { place, subPlace, start, end }: IStudyParticipate = req.body;

  const dateStr = req.query.date.toString();
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
      let { location } = req.query;
      if (!location) location = "수원";
      const filteredVote = vote;

      filteredVote.participations = filteredVote.participations.filter(
        (part) => part.place.location === location
      );

      return res.status(200).json(filteredVote);
    case "POST":
      if (isVoting) {
        vote.participations = vote.participations.map((participation) => ({
          ...participation,
          attendences: participation.attendences.filter((attendence) => {
            return (
              (attendence.user as IUser)?.uid.toString() !==
              token.uid.toString()
            );
          }),
        }));

        await vote.save();
      }

      const attendance = {
        time: { start: start, end: end },
        user: token.id,
      } as IAttendance;

      vote.participations = vote.participations.map((participation) => {
        const placeId = (participation.place as IPlace)._id.toString();
        const subPlaceIdArr = subPlace?.map((place) => place._id);
        if (placeId === place._id) {
          return {
            ...participation,
            attendences: [
              ...participation.attendences,
              { ...attendance, firstChoice: true },
            ],
          };
        } else if (subPlaceIdArr.includes(placeId)) {
          return {
            ...participation,
            attendences: [
              ...participation.attendences,
              { ...attendance, firstChoice: false },
            ],
          };
        }
        return participation;
      });

      await vote.save();
      return res.status(204).end();

    case "PATCH":
      if (start && end) {
        vote.participations.map((participation) => {
          participation.attendences.map((attendance) => {
            if (
              (attendance.user as IUser)?.uid.toString() ===
              token.uid.toString()
            ) {
              attendance.time.start = start;
              attendance.time.end = end;
            }
          });
        });

        await vote.save();
        return res.status(204).end();
      } else {
        return res.status(500).end();
      }

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

    default:
      return res.status(500).end();
  }
}
