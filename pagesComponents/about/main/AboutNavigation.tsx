import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import { useRouter } from "next/router";

import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarCheck,
  faOtter,
  faRankingStar,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { VOTE_TABLE_COLOR } from "../../../constants/design";
import { GATHER_ALERT, POINT_ALERT } from "../../../constants/localStorage";
function AboutNavigation() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const router = useRouter();

  const [isGatherAlert, setIsGatherAlert] = useState(false);
  const [isPointAlert, setIsPointAlert] = useState(false);

  useEffect(() => {
    if (isGuest) return;
    if (!localStorage.getItem(POINT_ALERT)) setIsPointAlert(true);
    if (!localStorage.getItem(GATHER_ALERT)) setIsGatherAlert(true);
  }, [isGuest]);

  const onClick = (type: string) => {
    if (type === "gather") localStorage.setItem(GATHER_ALERT, "read");
    if (type === "point") localStorage.setItem(POINT_ALERT, "read");
    router.push(type);
  };

  return (
    <>
      <Layout>
        <Item>
          <Button onClick={() => router.push("record")}>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="xl"
              color={VOTE_TABLE_COLOR[1]}
            />{" "}
          </Button>
          <span>기록</span>
        </Item>
        <Item>
          <Button onClick={() => onClick("point")}>
            <FontAwesomeIcon
              icon={faRankingStar}
              size="xl"
              color={VOTE_TABLE_COLOR[2]}
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
          </Button>{" "}
          <span>포인트</span>
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
          <Button onClick={() => onClick("gather")}>
            <FontAwesomeIcon
              icon={faOtter}
              size="xl"
              color={VOTE_TABLE_COLOR[0]}
            />

            <IconWrapper>
              <FontAwesomeIcon
                icon={faStar}
                color="var(--color-red)"
                size="sm"
              />
            </IconWrapper>
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

const IconWrapper = styled.div`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;

const Layout = styled.div`
  position: relative;
  display: flex;

  justify-content: space-between;
  padding: 10px 14px;

  border-bottom: 1px solid var(--font-h6);
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
  position: relative;
`;

export default AboutNavigation;
