import { NextApiRequest, NextApiResponse } from "next";
import { GiftModel } from "../../../models/gift";

import dbConnect from "../../../libs/dbConnect";
import { BadRequestError } from "../../../libs/custom-error";

export default async function giftController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, uid, cnt, giftid } = req.body;

    const existingUser = await GiftModel.findOne({ uid });
    console.log("post", giftid, cnt);
    if (existingUser) {
      const user = await GiftModel.findByIdAndUpdate(
        { _id: existingUser._id },
        { name, uid, cnt: existingUser.cnt + cnt, giftid },
        { new: true, runValidators: true }
      );
      if (!user) {
        throw new BadRequestError("정보에 해당하는 유저가 존재하지 않습니다.");
      }

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
    const giftUsers = await GiftModel.find({})
      .sort("createdAt")
      .select("-_id -createdAt -updatedAt -__v");

    res.status(200).json({
      message: "응모에 참여한 모든 유저를 불러오는데 성공하였습니다.",
      users: giftUsers,
    });
  }
}
