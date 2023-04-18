import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { Badge } from "@chakra-ui/react";
import Image from "next/image";

import { ModalLgLight } from "../../styles/layout/modal";
import UserInfoGroup from "./UserInfoModal/UserInfoGroup";
import UserInfoBadge from "./UserInfoModal/UserInfoBadge";
import AttendChart from "../../components/utils/AttendChart";

import { useCommentQuery, useScoreAllQuery } from "../../hooks/user/queries";
import { userBadgeScore } from "../../libs/utils/userUtils";
import { birthToAge } from "../../libs/utils/membersUtil";

import { IUser, USER_BADGES } from "../../types/user";
import { motion } from "framer-motion";

function UserInfoModal({
  user,
  setIsModal,
}: {
  user: IUser;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [navType, setNavType] = useState("chart");
  const { data: comments } = useCommentQuery();

  const comment = comments?.comments.find((att) => att._id === user._id);

  const { data } = useScoreAllQuery();
  const userScore = data?.find((who) => who._id === user._id).point;

  const { badge } = userBadgeScore(userScore);

  return (
    <>
      <Layout>
        <UpPart>
          <UserImage>
            <Image
              src={`${user.profileImage}`}
              alt="profileImage"
              width={72}
              height={72}
              unoptimized={true}
            />
          </UserImage>
          <UserInfo>
            <UserName>
              <span>{user.name}</span>
              <Badge fontSize={12} colorScheme={USER_BADGES[badge]}>
                {badge}
              </Badge>
            </UserName>
            <UserProfile>
              <div>
                <div>
                  <DetailInfo>나이: </DetailInfo>
                  <DetailValue>{birthToAge(user.birth)}</DetailValue>
                </div>
                <div>
                  <DetailInfo>성별: </DetailInfo>
                  <DetailValue>{user.gender.slice(0, 1)}</DetailValue>
                </div>
                <div>
                  <DetailInfo>MBTI: </DetailInfo>
                  <DetailValue>
                    {user.mbti ? user.mbti.toUpperCase() : "생략"}
                  </DetailValue>
                </div>
              </div>
              <div>
                <DetailInfo>가입일: </DetailInfo>
                <DetailValue>{user.registerDate}</DetailValue>
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
              <ChartWrapper
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
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
const Layout = styled(ModalLgLight)``;

const UpPart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const UserImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
`;
const UserInfo = styled.div`
  padding-top: 2px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 12px;
`;
const UserRelNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
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
  margin-bottom: 6px;
  align-items: center;
  > span:first-child {
    margin-right: 7px;
    font-size: 17px;
    font-weight: 600;
  }
`;
const UserProfile = styled.div`
  display: flex;
  padding-right: 4px;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1px;
  height: 100%;
  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const DownPart = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const DetailInfo = styled.span`
  font-size: 12px;
  color: var(--font-h3);
`;

const DetailValue = styled.span`
  font-size: 12px;
`;

const Detail = styled.div`
  flex: 1;
  margin-top: 10px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const ChartWrapper = styled(motion.div)`
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
export default UserInfoModal;
