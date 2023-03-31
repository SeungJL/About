import styled from "styled-components";

import UserBadge from "../../components/block/UserBadge";
import { birthToAge } from "../../libs/utils/membersUtil";

import { ModalLg, ModalSm, ModalXL } from "../../styles/LayoutStyles";

import { Dispatch, SetStateAction, useState } from "react";
import UserInfoBadge from "./UserInfoModal/UserInfoBadge";

import UserInfoGroup from "./UserInfoModal/UserInfoGroup";
import { useCommentQuery } from "../../hooks/user/queries";
import { IUser } from "../../types/user";
import AttendChart from "../../components/utils/AttendChart";
import Image from "next/image";

export default function UserInfoModal({
  user,
  setIsModal,
}: {
  user: IUser;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [navType, setNavType] = useState("chart");
  const { data: comments } = useCommentQuery();

  const comment = comments?.comments.find((att) => att._id === user._id);

  useCommentQuery();
  return (
    <>
      <Layout>
        <UpPart>
          <UserImage>
            <Image
              src={`${user.profileImage}`}
              alt="profileImage"
              width={64}
              height={64}
              unoptimized={true}
            />
          </UserImage>
          <UserInfo>
            <UserName>
              <span>{user.name}</span>
              <UserBadge role={user.role} />
            </UserName>
            <UserProfile>
              <div>
                <FontSm>나이: </FontSm>
                <span>{birthToAge(user.birth)}</span>
                <FontSm>성별: </FontSm>
                <span>{user.gender.slice(0, 1)}</span>
                <FontSm>MBTI: </FontSm>
                <span>{user.mbti ? user.mbti.toUpperCase() : "생략"}</span>
              </div>
              <div>
                <FontSm>가입일: </FontSm>
                <span>{user.registerDate}</span>
              </div>
            </UserProfile>
          </UserInfo>
        </UpPart>
        <DownPart>
          <CommentWrapper>
            <Comment>
              <span>Comment</span>

              <span>{comment?.comment}</span>
            </Comment>
          </CommentWrapper>
          <UserRelNav>
            <Button
              onClick={() => setNavType("chart")}
              selected={navType === "chart"}
            >
              Chart
            </Button>
            <Button
              onClick={() => setNavType("group")}
              selected={navType === "group"}
            >
              소모임
            </Button>
            <Button
              onClick={() => setNavType("badge")}
              selected={navType === "badge"}
            >
              배지
            </Button>
          </UserRelNav>
          <Detail>
            {navType === "badge" ? (
              <UserInfoBadge />
            ) : navType === "chart" ? (
              <ChartWrapper>
                <AttendChart type="modal" user={user} />
              </ChartWrapper>
            ) : (
              <UserInfoGroup />
            )}
          </Detail>
        </DownPart>
      </Layout>
    </>
  );
}
const Layout = styled(ModalSm)`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const UpPart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const UserImage = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  overflow: hidden;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  padding-left: 2px;
`;
const UserRelNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 12px;
`;
const Button = styled.button<{ selected: boolean }>`
  width: 70px;
  height: 20px;
  border: 1px solid var(--font-h4);
  border-radius: 10px;
  font-size: 11px;
  background-color: ${(props) => (props.selected ? "var(--font-h6)" : "none")};
`;

const UserName = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
  > span {
    margin-right: 7px;
  }
`;
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: px;
  font-size: 12px;
  height: 100%;
  > div {
    > span:nth-child(even) {
      margin-right: 10px;
    }
  }
  > div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

const DownPart = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const FontSm = styled.span`
  font-size: 0.95em;
  color: var(--font-h3);
`;

const Detail = styled.div`
  flex: 1;
  margin-top: 10px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const ChartWrapper = styled.div`
  position: absolute;
  top: -20px;
  left: -10px;
`;

const CommentWrapper = styled.div`
  border: 1px solid var(--font-h4);
  padding: 2px;
`;
const Comment = styled.div`
  border: 1px solid var(--font-h4);
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  height: 44px;

  > span:first-child {
    padding-top: 3px;
    font-size: 10px;
    color: var(--font-h3);
  }
  > span:last-child {
    padding-top: 3px;
    font-size: 12px;
    color: var(--font-h1);
  }
`;
