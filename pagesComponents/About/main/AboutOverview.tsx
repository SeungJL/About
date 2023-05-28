import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import ModalPortal from "../../../components/ModalPortal";
import BadgeInfoModal from "../../../modals/info/BadgeInfoModal";

import { useRecoilState, useRecoilValue } from "recoil";
import { useParticipationRateQuery } from "../../../hooks/user/queries";
import { voteDateState } from "../../../recoil/studyAtoms";
import { userBadgeState } from "../../../recoil/userAtoms";
import {
  myScoreRank,
  SortUserScore,
  userBadgeScore,
} from "../../../libs/utils/userUtils";

import { IRankScore, USER_BADGES } from "../../../types/user";
import { useRouter } from "next/router";
import NotCompletedModal from "../../../modals/system/NotCompletedModal";

import {
  usePointAllQuery,
  usePointQuery,
  useScoreAllQuery,
  useScoreQuery,
} from "../../../hooks/user/pointSystem/queries";
import { usePointMutation } from "../../../hooks/user/pointSystem/mutation";
import {
  faHouse,
  faCalendarCheck,
  faClipboard,
  faUsersViewfinder,
  faPeopleRoof,
  faUtensils,
  faSchool,
  faBookOpen,
  faExclamationCircle,
  faIdCard,
  faClipboardCheck,
  faNewspaper,
  faRankingStar,
  faStore,
  faUserGroup,
  faImage,
  faUsers,
  faOtter,
} from "@fortawesome/free-solid-svg-icons";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { VOTE_TABLE_COLOR } from "../../../constants/design";
function AboutOverview() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Layout>
        <Item>
          <Button onClick={() => router.push("record")}>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="xl"
              color={VOTE_TABLE_COLOR[1]}
            />
          </Button>
          <span>기록</span>
        </Item>
        <Item>
          <Button onClick={() => router.push("record")}>
            <FontAwesomeIcon
              icon={faRankingStar}
              size="xl"
              color={VOTE_TABLE_COLOR[2]}
            />
          </Button>{" "}
          <span>활동 현황</span>
        </Item>
        <Item>
          <Button onClick={() => router.push("friend")}>
            <FontAwesomeIcon
              icon={faUsers}
              size="xl"
              color={VOTE_TABLE_COLOR[3]}
            />
          </Button>{" "}
          <span>친구</span>
        </Item>
        <Item>
          <Button onClick={() => router.push("gather")}>
            <FontAwesomeIcon
              icon={faOtter}
              size="xl"
              color={VOTE_TABLE_COLOR[0]}
            />
          </Button>{" "}
          <span>모임</span>
        </Item>
        <Item>
          <Button onClick={() => router.push("plaza")}>
            <FontAwesomeIcon icon={faPlaystation} size="xl" />
          </Button>{" "}
          <span>광장</span>
        </Item>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: relative;
  display: flex;

  justify-content: space-between;
  padding: 10px 14px;

  border-bottom: 1px solid var(--font-h6);
`;

const TopPart = styled.div`
  background-color: var(--font-h6);
  height: 60px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 347px;
  background-color: white;
  border-radius: var(--border-radius);
  position: absolute;
  padding: 14px 20px;
  top: 10px;
  margin: 0 14px;
  align-items: center;
  box-shadow: var(--box-shadow);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    font-size: 12px;
    color: var(--font-h2);
  }
`;

const Button = styled.button`
  width: 50px;
  height: 50px;

  border-radius: 20px;
  background-color: var(--font-h7);
  margin-bottom: 4px;
`;

export default AboutOverview;
