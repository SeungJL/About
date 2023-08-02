import { Button } from "@chakra-ui/react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function ApplySuccess({}) {
  const router = useRouter();
  return (
    <Layout>
      <Icon>
        <FontAwesomeIcon icon={faCircleCheck} size="5x" />
      </Icon>
      <Content>
        <span>신청이 완료됐어요!</span>
        <span style={{ textAlign: "center" }}>
          확인하는대로 연락 드릴게요!
          <br /> 조금만 기다려주세요~!
        </span>
      </Content>
      <ButtonWrapper>
        <Button
          width="100%"
          height="100%"
          borderRadius="100px"
          backgroundColor="var(--color-mint)"
          color="white"
          fontSize="15px"
          onClick={() => router.push("/login")}
          _focus={{ backgroundColor: "var(--color-mint)" }}
        >
          확인
        </Button>
      </ButtonWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 375px;
  min-height: 100vh;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  z-index: 2000;
  position: fixed;
  background-color: white;
`;

const Icon = styled.div`
  position: absolute;
  top: 24%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-mint);
`;

const Content = styled.div`
  width: 100%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 22px;
  }
  > span:last-child {
    display: inline-block;
    margin-top: var(--margin-main);
    font-size: 17px;
    color: var(--font-h2);
    font-weight: 500;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  padding: var(--padding-main);
  left: 0;
`;

export default ApplySuccess;
