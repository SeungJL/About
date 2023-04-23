import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { strToDate } from "../../../../libs/utils/dateUtils";
import { Vote } from "../../../../models/vote";
import { findOneVote } from "../../../../services/voteService";
import { IVote } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const dateStr = req.query.date as string;
  const date = strToDate(dateStr).toDate();

  const token = await getToken({ req, secret });
  const _id = token.id;

  await dbConnect();

  const vote = await findOneVote(date);
  if (!vote) return res.status(404).end();

  switch (method) {
    case "GET": {
      const result = [];

      vote?.participations.map((participation) => {
        participation.absences.map((absence) => {
          result.push({
            uid: (absence.user as IUser)?.uid,
            message: absence.message,
          });
        });
      });
      res.status(200).json(result);
    }
    case "POST":
      {
        const { message } = req.body;
       
        await vote?.participations.map((participation) => {
          participation.attendences.map((attendence) => {
            if (
              (attendence.user as IUser)?.uid.toString() ===
                token.uid.toString() &&
              attendence.firstChoice
            ) {
              participation.absences = [
                ...participation.absences,
                {
                  user: token.id as string,
                  noShow: true,
                  message,
                },
              ];
            }
          });
        });
      }
      await vote?.save();
      return res.status(204).end();
    default:
      return res.status(400).end();
  }
}