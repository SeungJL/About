import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileImg from "../../components/common/ProfileImg";
import ProfileImage from "../../components/existing/profileImage";
import { useArrivedQuery } from "../../hooks/vote/queries";
import { getToday } from "../../libs/utils/dateUtils";
import { IUser } from "../../models/user";
import { BaseModal } from "../../styles/LayoutStyles";

export default function CheckUserModal() {
  const { data: session } = useSession();
  const user = session.user;

  const userList = useArrivedQuery(getToday())?.data;

  return (
    <ModalLayout>
      {(userList as any)?.map((user, idx) => (
        <UserAttendInfo
          key={idx}
          user={user.user}
          memo={user.memo}
          arrived={user.arrived}
        />
      ))}
    </ModalLayout>
  );
}

const ModalLayout = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 330px;
  height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export interface IAttendMessage {
  user: IUser;
  memo: string;
  arrived: string;
}

const UserAttendInfo = ({ user, memo, arrived }: IAttendMessage) => {
  const name = user.name;
  const imgSrc = user.profileImage;
  const attendTime = dayjs(arrived).subtract(9, "hour").format("HH시 mm분");

  return (
    <UserAttendInfoLayout>
      <Profile>
        <ProfileImg user={user} />
        {name}
      </Profile>
      <AttendInfo>
        <Info>
          <span>출석: {attendTime}</span>
          <span>예정 종료: 18시 00분</span>
        </Info>
        <Comment>{memo}</Comment>
      </AttendInfo>
    </UserAttendInfoLayout>
  );
};

const UserAttendInfoLayout = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.5);
`;
const Profile = styled.div``;
const ArrivedTime = styled.span``;
const Info = styled.div`
  display: flex;
  justify-content: space-around;
  > span {
    font-size: 0.9em;
  }
`;
const AttendInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const finishTime = styled.span``;

const Comment = styled.div`
  font-size: 0.9em;
  text-align: center;
  display: flex;
  align-items: center;
  margin: auto;
  flex: 1;
`;
