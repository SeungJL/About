import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";
import { PROMOTION_TEXT } from "../../constants/private";
import PromotionText from "./PromotionText";

function PromotionNav() {
  const [isText, setIsText] = useState(true);

  return (
    <Layout>
      <Wrapper>
        <Nav>
          <Button
            colorScheme={isText ? "mintTheme" : "gray"}
            onClick={() => setIsText(true)}
          >
            본문 내용
          </Button>
          <Button
            colorScheme={!isText ? "mintTheme" : "gray"}
            onClick={() => setIsText(false)}
            w="88px"
          >
            이미지
          </Button>
        </Nav>
        {isText ? (
          <CopyBtn size="md" text={PROMOTION_TEXT} />
        ) : (
          <Message>사진을 꾹 눌러서 저장</Message>
        )}
      </Wrapper>
      <Content>
        {isText ? (
          <>
            <Title>카공 및 친목 동아리 ABOUT</Title>
            <PromotionText />
          </>
        ) : (
          <ImageWrapper>
            <Image
              src="https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png"
              alt="promotionImage"
              width={200}
              height={200}
            />
            <span>이미지는 선택이에요! 굳이 안올리셔도 됩니다!</span>
          </ImageWrapper>
        )}
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 40px;
  margin-bottom: var(--margin-max);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  > button {
    margin-left: auto;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    margin-top: var(--margin-sub);
    font-size: 12px;
    color: var(--font-h2);
  }
`;

const Nav = styled.nav``;

const Content = styled.div`
  margin-top: var(--margin-main);
  display: flex;
  flex-direction: column;
`;

const Message = styled.span`
  margin-left: auto;
  color: var(--font-h2);
  font-size: 12px;
`;

const Title = styled.div`
  font-weight: 700;

  margin-bottom: var(--margin-sub);
`;

export default PromotionNav;
