import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { PromotionComponent } from "../../constants/private";

function PromotionNav() {
  const [isText, setIsText] = useState(true);

  return (
    <Layout>
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
      <Content>
        {isText ? (
          <>
            <PromotionComponent />
          </>
        ) : (
          <>
            <Image
              src="https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png"
              alt="promotionImage"
              width={200}
              height={200}
            />
            <Message>꾹 눌러서 저장</Message>
          </>
        )}
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 60px;
`;

const Nav = styled.nav``;

const Content = styled.div`
  margin-top: var(--margin-md);
`;

const Message = styled.span``;

export default PromotionNav;
