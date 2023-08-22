import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IModal } from "../../../types/reactTypes";

function PromotionModalFooter({ setIsModal }: IModal) {
  const router = useRouter();

  const onClickAttend = () => {
    router.push(`/promotion`);
    setIsModal(false);
  };

  return (
    <>
      <Layout>
        <Button onClick={() => setIsModal(false)} width="50%">
          다음에
        </Button>
        <Button
          backgroundColor="var(--color-mint)"
          color="white"
          onClick={onClickAttend}
          width="50%"
        >
          참여할래 !
        </Button>
      </Layout>
    </>
  );
}

const Layout = styled.footer`
  display: flex;
  justify-content: space-between;
  > div {
    > button {
      font-size: 14px;
      cursor: pointer;
      width: 90px;
      padding: 0 14px;
    }
    > button:first-child {
      margin-right: 6px;
    }
    > button:last-child {
      font-weight: 600;
    }
  }
`;
const LastWinnerBtn = styled.button`
  align-self: flex-end;
  font-size: 13px;
  color: var(--color-mint);
`;
export default PromotionModalFooter;
