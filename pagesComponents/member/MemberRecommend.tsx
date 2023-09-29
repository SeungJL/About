import {
  faCakeCandles,
  faCat,
  faDog,
  faDragon,
  faPaw,
  faShrimp,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FRIEND_RECOMMEND_CATEGORY } from "../../constants/contents/friend";
import { useFailToast } from "../../hooks/CustomToast";
import { transferMemberDataState } from "../../recoil/transferDataAtoms";
import { IUser } from "../../types/user/user";

interface IMemberRecommend {
  members: IUser[];
}

function MemberRecommend({ members }: IMemberRecommend) {
  const failToast = useFailToast();
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const locationUrl = router.query.location;

  const setTransferMemberData = useSetRecoilState(transferMemberDataState);

  const onClickBtn = (idx: number) => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    setTransferMemberData({ section: "all", members });
    router.push(`/member/${locationUrl}/${idx}`);
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
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  margin: 0 var(--margin-main);
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  margin-bottom: var(--margin-sub);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border-radius: var(--border-radius-sub);
  border: var(--border-sub);
  height: 60px;
  margin-top: var(--margin-md);
  font-size: 15px;
  text-align: start;
  padding: 0 var(--padding-max);
  > span {
    margin-left: var(--margin-sub);
  }
`;

export default MemberRecommend;
