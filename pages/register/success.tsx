import { Button } from "@chakra-ui/react";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function ApplySuccess({}) {
  const router = useRouter();
  return (
    <Layout>
      <Content2>
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="5x"
          color="var(--color-mint)"
        />

        <Content>
          <span>신청이 완료됐어요!</span>
          <span style={{ textAlign: "center" }}>
            확인하는대로 연락 드릴게요!
            <br /> 조금만 기다려주세요~!
          </span>
        </Content>
      </Content2>
      <Button
        position="fixed"
        left="50%"
        bottom="0"
        transform="translate(-50%,0)"
        width={`calc(100% - 2*var(--margin-main))`}
        maxWidth={358}
        height="44px"
        mb="var(--margin-main)"
        borderRadius="100px"
        backgroundColor="var(--color-mint)"
        color="white"
        fontSize="15px"
        onClick={() => router.push(`/login`)}
        _focus={{ backgroundColor: "var(--color-mint)", color: "white" }}
      >
        확인
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  background-color: var(--font-h8);
  display: flex;
  flex-direction: column;
`;

const Content2 = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--margin-main);
  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 22px;
  }
  > span:last-child {
    margin-top: var(--margin-sub);
    font-size: 17px;
    color: var(--font-h2);
  }
`;

export default ApplySuccess;
