import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { ACCOUNT_SHORT } from "../../constants/private";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { useDepositMutation } from "../../hooks/user/pointSystem/mutation";
import { useUserRequestMutation } from "../../hooks/userRequest/mutations";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/common";
import { IUserRequest } from "../../types/user";

function RequestChargeDepositModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [isFirst, setIsFirst] = useState(true);

  const { mutate: sendRequest } = useUserRequestMutation();
  const { mutate: getDeposit } = useDepositMutation();

  const onComplete = () => {
    const userRequestInfo: IUserRequest = {
      category: "충전",
      writer: session.user.name,
    };
    sendRequest(userRequestInfo);
    getDeposit({ value: 3000, message: "보증금 충전" });
    setIsModal(false);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="보증금 충전" setIsModal={setIsModal} />
      {isFirst ? (
        <>
          <Container>
            <MainItem>
              <span>보유 보증금</span>
              <MyDeposit>1000원</MyDeposit>
            </MainItem>
            <MainItem>
              <span>충전 금액</span>
              <ChargeDeposit>+ 3000원</ChargeDeposit>
            </MainItem>
            <Hr />
            <MainItem>
              <span>충전 후 보증금</span>
              <span>= 4000원</span>
            </MainItem>
          </Container>
          <Button
            width="100%"
            background="var(--color-mint)"
            color="white"
            onClick={() => setIsFirst(false)}
          >
            충전하기
          </Button>
        </>
      ) : (
        <>
          <ModalMain>
            <MainItem>
              <span>입금 계좌</span>
              <div>
                <span> {ACCOUNT_SHORT}</span>
                <CopyBtn text={ACCOUNT_SHORT} />
              </div>
            </MainItem>
            <MainItem>
              <span>입금자 명</span>
              <span>{session.user.name}</span>
            </MainItem>
            <MainItem>
              <span>입금 금액</span>
              <span>3000원</span>
            </MainItem>
            <Message>위의 계좌로 입금 후 완료 버튼을 눌러주세요!</Message>
          </ModalMain>
          <Footer>
            <Button width="50%" onClick={() => setIsModal(false)}>
              취소
            </Button>
            <Button
              width="50%"
              onClick={onComplete}
              background="var(--color-mint)"
              color="white"
            >
              입금완료
            </Button>
          </Footer>
        </>
      )}
    </ModalLayout>
  );
}

const Container = styled(ModalMain)`
  justify-content: center;
`;

const MainItem = styled.div`
  padding: var(--padding-min) 0;
  display: flex;
  justify-content: space-between;
  > span:first-child {
    font-weight: 600;
    color: var(--font-h1);
  }
  > div {
    span:first-child {
      margin-right: 8px;
    }
  }
`;

const Hr = styled.div`
  height: 1.5px;
  background-color: var(--font-h65);
  margin: var(--margin-min) 0;
`;

const MyDeposit = styled.span`
  margin-left: var(--margin-sub);
`;

const ChargeDeposit = styled.span`
  color: var(--color-mint);
`;

const Message = styled.div`
  padding-top: 6px;
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Footer = styled.footer``;

export default RequestChargeDepositModal;
