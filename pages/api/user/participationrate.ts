import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next/types";
import dbConnect from "../../../libs/dbConnect";
import { now } from "../../../libs/utils/dateUtils";
import { User } from "../../../models/user";
import { Vote } from "../../../models/vote";
import { getParticipationRate } from "../../../services/rateService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { startDay, endDay } = req.query as {
    startDay: string;
    endDay: string;
  };

  await dbConnect();

  switch (method) {
    case "GET":
      const participationRateForm = getParticipationRate(startDay, endDay);
      const result = [];

      for (let value in participationRateForm) {
        const a = {};
        a[value] = participationRateForm[value];
        result.push(a);
      }

      res.status(200).json(result);
  }
}
