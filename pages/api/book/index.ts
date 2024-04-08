import { NextApiRequest, NextApiResponse } from "next";
import { now } from "../../../utils/dateTimeUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const startDt = now().subtract(1, "month").format("YYYY-MM");
  const endDt = now().format("YYYY-MM");
  const { method } = req;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  switch (method) {
    case "GET":
      const response = await fetch(
        `https://data4library.kr/api/loanItemSrch?authKey=0a18d855cdbe794e1225816ee8f65f7e71c94ffcb19cba97e9c90e1199e078ff&startDt=${startDt}&endDt=${endDt}&gender=1&age=20&format=json`
      );
      if (response.status === 200) {
        const data = await response.json();
        res.status(200).send(data);
      } else {
        throw new Error("unable to get api");
      }
  }

  return res.status(400).end();
}
