import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  CalendarIcon,
  CampfireIcon,
  GroupStudyIcon,
  MemberIcon,
  StoreIcon,
} from "../../../components/common/Icon/AboutCategoryIcons";
import { NewAlertIcon } from "../../../components/common/Icon/AlertIcon";

import { isGatherAlertState } from "../../../recoil/alertAtoms";
import { locationState } from "../../../recoil/userAtoms";

type AboutCategory =
  | "record"
  | "point"
  | "member"
  | "gather"
  | "plaza"
  | "groupStudy";

function AboutCategoryNav() {
  const router = useRouter();
  const location = useRecoilValue(locationState);

  const isGatherAlert = useRecoilValue(isGatherAlertState);
  const [isPointAlert, setIsPointAlert] = useState(false);

  const onClickItem = (type: AboutCategory) => {
    if (type === "member") {
      router.push(`/member/${location}`);
      return;
    }
    router.push(type);
  };

  return (
    <Layout>
      <Item className="about_navigation1">
        <Button onClick={() => onClickItem("record")}>
          <CalendarIcon />
        </Button>
        <span>캘린더</span>
      </Item>
      <Item className="about_navigation2">
        <Button onClick={() => onClickItem("point")}>
          <StoreIcon />
          {isPointAlert && (
            <IconWrapper>
              <FontAwesomeIcon
                icon={faStar}
                color="var(--color-red)"
                size="sm"
              />
            </IconWrapper>
          )}
        </Button>
        <span>스토어</span>
      </Item>
      <Item className="about_navigation3">
        <Button onClick={() => onClickItem("member")}>
          <MemberIcon />{" "}
          <IconWrapper>
            <NewAlertIcon size="lg" />
          </IconWrapper>
        </Button>
        <span>동아리원</span>
      </Item>
      <Item className="about_navigation4">
        <Button onClick={() => onClickItem("gather")}>
          <CampfireIcon />
          {isGatherAlert && (
            <IconWrapper>
              <NewAlertIcon size="lg" />
            </IconWrapper>
          )}
        </Button>
        <span>모임/번개</span>
      </Item>
      <Item className="about_navigation5">
        <Button onClick={() => onClickItem("groupStudy")}>
          <GroupStudyIcon />{" "}
          <IconWrapper>
            <NewAlertIcon size="lg" />
          </IconWrapper>
        </Button>
        <span>소모임</span>
      </Item>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--padding-main) 24px;
  background-color: var(--font-h8);
  border-bottom: 1px solid var(--font-h56);
`;

const IconWrapper = styled.div`
  font-size: 12px;
  position: absolute;
  right: -1px;
  bottom: -1px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 46px;
  > span {
    white-space: nowrap;
    font-size: 12px;
    color: var(--font-h1);
    font-weight: 400;
  }
`;

const Button = styled.button`
  width: 46px;
  height: 46px;
  margin-bottom: 9px;
  position: relative;
`;

export default AboutCategoryNav;
