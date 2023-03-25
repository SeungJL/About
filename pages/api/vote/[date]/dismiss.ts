import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { strToDate } from "../../../../libs/utils/dateUtils";
import { IUser } from "../../../../models/user";
import { IAbsence, IVote, Vote } from "../../../../models/vote";
import { findOneVote } from "../../../../services/voteService";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVote>
) {
  const { method } = req;
  const dateStr = req.query.date as string;
  const date = strToDate(dateStr).add(1, "day").toDate();

  const token = await getToken({ req, secret });

  await dbConnect();

  const vote = await findOneVote(date);
  if (!vote) return res.status(404).end();

  switch (method) {
    case "PATCH":
      vote.participations.forEach((participation) => {
        const isTargetParticipation = !!participation.attendences.find(
          (att) => (att.user as IUser)?.uid.toString() === token.uid.toString()
        );
        if (isTargetParticipation) {
          participation.attendences = participation.attendences.filter(
            (att) =>
              (att.user as IUser)?.uid.toString() !== token.uid.toString()
          );
          participation.absences = [
            ...participation.absences,
            { user: token._id, noShow: false, message: "" } as IAbsence,
          ];
        }
      });

      await vote.save();
      return res.status(204).end();
    default:
      return res.status(400).end();
  }
}
