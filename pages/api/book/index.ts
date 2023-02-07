import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  switch (method) {
    case "GET":
      const response = await fetch(
        `https://data4library.kr/api/loanItemSrch?authKey=0a18d855cdbe794e1225816ee8f65f7e71c94ffcb19cba97e9c90e1199e078ff&startDt=2022-01-01&endDt=2022-03-31&gender=1&age=20`
      );
      if (response.status === 200) {
        const data = await response.text();
        res.status(200).send(data);
      } else {
        throw new Error("unable to get api");
      }
  }

  return res.status(400).end();
}
