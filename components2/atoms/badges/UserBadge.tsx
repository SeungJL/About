import { BADGE_COLOR_MAPPINGS } from "@/constants/serviceConstants/badgeConstants";
import { getUserBadge } from "@/utils/convertUtils/convertDatas";
import { Badge } from "flowbite-react";

interface IUserBadge {
  score: number;
  uid: string;
}

export default function UserBadge({ score, uid }: IUserBadge) {
  const badge = getUserBadge(score, uid);
  return (
    <Badge className="py-0 px-1" size="xs" color={BADGE_COLOR_MAPPINGS[badge]}>
      {badge}
    </Badge>
  );
}
