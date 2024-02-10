import ProfileCommentCard, {
  IProfileCommentCard,
} from "../molecules/cards/ProfileCommentCard";

interface IProfileCardColumn {
  userCardArr: IProfileCommentCard[];
}
export default function ProfileCardColumn({ userCardArr }: IProfileCardColumn) {
  return (
    <div className="bg-white shadow rounded-lg">
      {userCardArr.map((userCard, idx) => (
        <ProfileCommentCard
          key={idx}
          user={userCard.user}
          comment={userCard?.comment}
          rightComponent={userCard?.rightComponent}
        />
      ))}
    </div>
  );
}
