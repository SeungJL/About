import { Button } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import { DispatchBoolean, IModal } from "../../../types/reactTypes";
import RequestPromotionRewardModal from "../../userRequest/RequestPromotionRewardModal";

interface IPromotionModalFooter extends IModal {
  setIsFirst: DispatchBoolean;
}

function PromotionModalFooter({
  setIsModal,
  setIsFirst,
}: IPromotionModalFooter) {
  const [isApplyModal, setIsApplyModal] = useState(false);

  return (
    <>
      <Layout>
        <LastWinnerBtn onClick={() => setIsFirst((old) => !old)}>
          지난 당첨자 확인
        </LastWinnerBtn>
        <div>
          <Button onClick={() => setIsModal(false)}>다음에</Button>
          <Button
            backgroundColor="var(--color-mint)"
            color="white"
            onClick={() => setIsApplyModal(true)}
          >
            참여할래 !
          </Button>
        </div>
      </Layout>
      {isApplyModal && <RequestPromotionRewardModal setIsModal={setIsModal} />}
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
