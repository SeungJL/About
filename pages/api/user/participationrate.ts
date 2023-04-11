import { NextApiRequest, NextApiResponse } from "next/types";
import dbConnect from "../../../libs/dbConnect";
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
      const participationRateForm = await getParticipationRate(
        startDay,
        endDay
      );
      const result = [];

      for (let value in participationRateForm) {
        result.push({ uid: value, cnt: participationRateForm[value] });
      }

      res.status(200).json(result);
  }
}
