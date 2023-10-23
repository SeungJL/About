import {
  faCalendarCheck,
  faOtter,
  faStar,
  faStore,
  faTeddyBear,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TABLE_COLORS } from "../../../constants/styles";

import { isGatherAlertState } from "../../../recoil/alertAtoms";
import { locationState } from "../../../recoil/userAtoms";

type AboutCategory = "record" | "point" | "member" | "gather" | "plaza";

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
    <>
      <Layout>
        <Item>
          <Button onClick={() => onClickItem("record")}>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="xl"
              color={TABLE_COLORS[1]}
            />
          </Button>
          <span>캘린더</span>
        </Item>
        <Item>
          <Button onClick={() => onClickItem("point")}>
            <FontAwesomeIcon icon={faStore} size="xl" color={TABLE_COLORS[3]} />
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
        <Item>
          <Button onClick={() => onClickItem("member")}>
            <FontAwesomeIcon icon={faUsers} size="xl" color={TABLE_COLORS[2]} />
          </Button>
          <span>멤버</span>
        </Item>
        <Item>
          <Button onClick={() => onClickItem("gather")}>
            <FontAwesomeIcon icon={faOtter} size="xl" color={TABLE_COLORS[0]} />
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
              color={TABLE_COLORS[4]}
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
  padding: var(--padding-md) var(--padding-main);
  padding-top: var(--padding-sub);
  border-bottom: var(--border-main-light);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    font-size: 11px;
    color: var(--font-h1);
    font-weight: 600;
  }
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  background-color: white;

  margin-bottom: var(--margin-md);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.015); // 테두리를 더 연하게 조절
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.02); // 그림자를 더 연하게 조절

  transition: transform 0.2s, box-shadow 0.2s;
`;

export default AboutCategoryNav;
