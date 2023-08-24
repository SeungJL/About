import { Button } from "@chakra-ui/react";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";
import { PROMOTION_TEXT } from "../../constants/private";
import PromotionText from "./PromotionText";

function PromotionContent() {
  const [isText, setIsText] = useState(true);

  return (
    <Layout>
      <Guide>
        <span>아래 글을 복사하여 홍보글을 게시해주세요!</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </Guide>
      <Container>
        <Wrapper>
          <Nav>
            <Button
              colorScheme={isText ? "mintTheme" : "gray"}
              onClick={() => setIsText(true)}
              _focus={{ outline: "none" }}
            >
              본문 내용
            </Button>
            <Button
              colorScheme={!isText ? "mintTheme" : "gray"}
              onClick={() => setIsText(false)}
              _focus={{ outline: "none" }}
              w="88px"
            >
              이미지
            </Button>
          </Nav>
          {isText && <CopyBtn size="md" text={PROMOTION_TEXT} />}
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
                width={220}
                height={220}
              />
              <div>
                <span>사진을 꾹 눌러서 저장 !</span>
                <span>(이미지는 선택이에요! 굳이 안올리셔도 됩니다.)</span>
              </div>
            </ImageWrapper>
          )}
        </Content>
      </Container>
    </Layout>
  );
}

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--margin-max);
  > span:first-child {
    font-weight: 600;
    margin-bottom: var(--margin-md);
  }
`;

const Container = styled.div`
  padding-top: var(--padding-max);
  background-color: var(--font-h7);
  padding: var(--padding-max) var(--padding-main);
`;

const Layout = styled.div`
  margin-top: var(--margin-max);
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
  > div:last-child {
    margin-top: var(--margin-sub);
    font-size: 12px;
    font-weight: 600;
    color: var(--font-h1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Nav = styled.nav`
  border: 1px solid var(--font-h5);
  border-radius: var(--border-radius-sub);
`;

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

export default PromotionContent;
