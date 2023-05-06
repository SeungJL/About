import { NextApiRequest, NextApiResponse } from "next";
import { GiftModel } from "../../../models/gift";

import dbConnect from "../../../libs/dbConnect";

export default async function giftController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, uid, cnt } = req.body;

    const existingUser = await GiftModel.findOne({ uid });

    if (existingUser) {
      const user = await GiftModel.findByIdAndUpdate(
        { _id: existingUser._id },
        { name, uid, cnt: existingUser.cnt + cnt },
        { new: true, runValidators: true }
      );
      // if (!user) {
      //   throw new Error()
      // }

      return res
        .status(200)
        .json({ message: "응모가 정상적으로 이루어졌습니다.", user });
    }
    const newUser = await GiftModel.create({ name, uid, cnt });
    res
      .status(200)
      .json({ message: "응모가 정상적으로 이루어졌습니다.", user: newUser });
  }
  if (req.method === "GET") {
    const giftUsers = await GiftModel.find({}).sort("createdAt");

    res.status(200).json({
      message: "응모에 참여한 모든 유저를 불러오는데 성공하였습니다.",
      users: giftUsers,
    });
  }
}
