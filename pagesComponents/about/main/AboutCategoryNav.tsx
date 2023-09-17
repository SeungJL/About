import { faDice } from "@fortawesome/pro-regular-svg-icons";
import {
  faCalendarCheck,
  faOtter,
  faStar,
  faTeddyBear,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../../constants/system";
import { isGatherAlertState } from "../../../recoil/alertAtoms";
import { locationState } from "../../../recoil/userAtoms";

type AboutCategory = "record" | "point" | "member" | "gather" | "plaza";

function AboutCategoryNav() {
  const router = useRouter();
  const location = useRecoilValue(locationState);

  const isGatherAlert = useRecoilValue(isGatherAlertState);
  const [isPointAlert, setIsPointAlert] = useState(true);

  const onClickItem = (type: AboutCategory) => {
    if (type === "member") {
      router.push(`/member/${location}`);
      return;
    }
    router.push(type);
  };

  return (
    <>
      <Layout>
        <Item>
          <Button onClick={() => onClickItem("record")}>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="xl"
              color={VOTE_TABLE_COLOR[1]}
            />
          </Button>
          <span>캘린더</span>
        </Item>
        <Item>
          <Button onClick={() => onClickItem("point")}>
            <FontAwesomeIcon
              icon={faDice}
              size="xl"
              color={VOTE_TABLE_COLOR[3]}
            />
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
          <span>트레이드</span>
        </Item>
        <Item>
          <Button onClick={() => onClickItem("member")}>
            <FontAwesomeIcon
              icon={faUsers}
              size="xl"
              color={VOTE_TABLE_COLOR[2]}
            />
          </Button>
          <span>멤버</span>
        </Item>
        <Item>
          <Button onClick={() => onClickItem("gather")}>
            <FontAwesomeIcon
              icon={faOtter}
              size="xl"
              color={VOTE_TABLE_COLOR[0]}
            />
            {isGatherAlert && (
              <IconWrapper>
                <FontAwesomeIcon
                  icon={faStar}
                  color="var(--color-red)"
                  size="sm"
                />
              </IconWrapper>
            )}
          </Button>
          <span>모임</span>
        </Item>
        <Item>
          <Button onClick={() => onClickItem("plaza")}>
            <FontAwesomeIcon
              icon={faTeddyBear}
              size="xl"
              color={VOTE_TABLE_COLOR[4]}
            />
          </Button>
          <span>광장</span>
        </Item>
      </Layout>
    </>
  );
}

const IconWrapper = styled.div`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;

const Layout = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: var(--padding-sub) var(--padding-main);
  border-bottom: var(--border-main-light);
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
  margin-bottom: var(--margin-min);
  position: relative;
`;

export default AboutCategoryNav;