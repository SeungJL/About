import Avatar from "@/components/atoms/Avatar";
import UserBadge from "@/components/atoms/badges/UserBadge";
import { IUserSummary } from "@/types/userTypes/userInfoTypes";
import "../../../styles/customClass.css";

export interface IProfileCommentCard {
  user: IUserSummary;
  comment?: string;
  rightComponent?: React.ReactNode;
}
export default function ProfileCommentCard({
  user,
  comment,
  rightComponent,
}: IProfileCommentCard) {
  return (
    <div className="flex  items-center px-4 py-3 border-b leading-6">
      <Avatar image={user.profileImage} size="md" avatar={user.avatar} />
      <div className="ml-3 border-b-0 border-gray-200 ">
        <div className="flex text-sm items-center font-semibold">
          <span className="mr-1.5">{user.name}</span>
          <UserBadge score={user.score} uid={user.uid} />
        </div>
        <span
          className="webkit-clamp-1  text-gray-4"
          style={{ fontSize: "13px" }}
        >
          {comment !== null ? comment : user.comment}
        </span>
      </div>
      <div className="ml-auto">{rightComponent} </div>
    </div>
  );
}
