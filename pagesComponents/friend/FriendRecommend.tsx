import {
  faCakeCandles,
  faCat,
  faDog,
  faDragon,
  faPaw,
  faShrimp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useFailToast } from "../../hooks/ui/CustomToast";
import { FRIEND_RECOMMEND_CATEGORY } from "../../storage/friend";

function FriendRecommend() {
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const failToast = useFailToast();
  const onClickBtn = (idx: number) => {
    if (isGuest) {
      failToast("guest");
      return;
    }

    router.push(`/friend/${idx}`);
  };
  return (
    <Layout>
      <Title>친구 추천</Title>
      <Nav>
        <Button onClick={() => onClickBtn(0)}>
          <FontAwesomeIcon icon={faDragon} color="#FF8896" />
          <span>{FRIEND_RECOMMEND_CATEGORY[0]}</span>
        </Button>
        <Button onClick={() => onClickBtn(1)}>
          <FontAwesomeIcon icon={faPaw} color="#71C3FF" />
          <span>{FRIEND_RECOMMEND_CATEGORY[1]}</span>
        </Button>
        <Button onClick={() => onClickBtn(2)}>
          <FontAwesomeIcon icon={faCakeCandles} color="#FEBC5A" />
          <span>{FRIEND_RECOMMEND_CATEGORY[2]}</span>
        </Button>
        <Button onClick={() => onClickBtn(3)}>
          <FontAwesomeIcon icon={faDog} color="#9E7CFF" />
          <span>{FRIEND_RECOMMEND_CATEGORY[3]}</span>
        </Button>
        <Button onClick={() => onClickBtn(4)}>
          <FontAwesomeIcon icon={faShrimp} color="var(--color-mint)" />
          <span>{FRIEND_RECOMMEND_CATEGORY[4]}</span>
        </Button>
        <Button onClick={() => onClickBtn(5)}>
          <FontAwesomeIcon icon={faCat} />
          <span>{FRIEND_RECOMMEND_CATEGORY[5]}</span>
        </Button>
      </Nav>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 14px;
  margin-top: 14px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  margin-bottom: 2px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border-radius: var(--border-radius);
  border: 1.5px solid var(--font-h6);
  height: 60px;
  margin-top: 8px;
  font-size: 15px;
  text-align: start;
  padding: 0 20px;
  > span {
    margin-left: 12px;
  }
`;

export default FriendRecommend;
