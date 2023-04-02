import { Badge, useTheme } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalXXL } from "../../styles/LayoutStyles";

export default function BadgeInfoModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const [isFirst, setIsFirst] = useState(true);
  return (
    <Layout>
      {isFirst ? (
        <>
          <Header>
            <span>멤버 배지</span>
            <div>
              멤버 등급은 기본적으로는 7가지로 나뉩니다. <br />
              흭득한 배지는 원하는 종류로 선택해서 사용할 수 있습니다.
              <br />
              간혹 7가지 종류에 없는 유니크한 배지도 흭득할 수 있습니다.
            </div>
          </Header>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle">
                아메리카노
              </Badge>
            </div>
            <Info>동아리 활동을 시작하는 뉴비</Info>
          </Item>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle" colorScheme="orange">
                라떼
              </Badge>
            </div>
            <Info>대충 어떻게 돌아가는지 이해함</Info>
          </Item>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle" colorScheme="green">
                마키아토
              </Badge>
            </div>
            <Info>열심 멤버</Info>
          </Item>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle" colorScheme="purple">
                에스프레소
              </Badge>
            </div>
            <Info>열할 멤버</Info>
          </Item>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle" colorScheme="yellow">
                모카
              </Badge>
            </div>
            <Info>공부뿐만 아니라 친목까지</Info>
          </Item>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle" colorScheme="twitter">
                콜드브루
              </Badge>
            </div>
            <Info>거의 다 아는 얼굴</Info>
          </Item>
          <Item>
            <div>
              <Badge fontSize={12} variant="subtle" colorScheme="teal">
                아인슈페너
              </Badge>
            </div>
            <Info>고인물</Info>
          </Item>
          <Footer onClick={() => setIsFirst(false)}>
            <button>다음 페이지</button>
          </Footer>
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
}

const Layout = styled(ModalXXL)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 16px 0;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid var(--font-h5);
  width: 100%;
  padding-bottom: 16px;
  > span:first-child {
    font-size: 22px;
    font-weight: 600;
  }
  > div {
    margin-top: 10px;
    font-size: 12px;
    color: var(--font-h1);
    text-align: center;
  }
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  padding: 0 16px;

  border-bottom: 1px solid var(--font-h5);

  > div {
    width: 40%;
    text-align: center;
  }
`;

const Info = styled.span`
  display: inline-block;
  font-size: 12px;
  width: 200px;
  text-align: center;
`;

const Footer = styled.footer`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    width: 100px;
    font-size: 16px;
    height: 26px;
    background-color: var(--color-red);
    color: white;
    border-radius: 10px;
  }
`;
