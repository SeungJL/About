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
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/common";

function RequestChargeDepositModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [isFirst, setIsFirst] = useState(true);



  const { mutate: getDeposit } = useDepositMutation({
    onSuccess() {
      completeToast("success");
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const onComplete = () => {
    getDeposit({ value: 3000, message: "보증금 충전" });
    setIsModal(false);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="보증금 충전" setIsModal={setIsModal} />
      {isFirst ? (
        <>
          <ModalMain>
            <MainItem>
              <span>보유 보증금</span>
              <span style={{ marginLeft: "12px" }}>1000원</span>
            </MainItem>
            <MainItem>
              <span>충전 금액</span>
              <span style={{ color: "var(--color-mint)" }}>+ 3000원</span>
            </MainItem>
            <hr style={{ margin: "4px 0" }} />
            <MainItem>
              <span>충전 후 보증금</span>
              <span>= 4000원</span>
            </MainItem>
          </ModalMain>
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
              <span style={{ width: "80px" }}>입금 계좌</span>
              <div>
                <span> {ACCOUNT_SHORT}</span>
                <CopyBtn text={ACCOUNT_SHORT} />
              </div>
            </MainItem>
            <MainItem>
              <span style={{ width: "80px" }}>입금자 명</span>
              <span>{session?.user.name}</span>
            </MainItem>
            <MainItem>
              <span style={{ width: "80px" }}>입금 금액</span>
              <span>3000원</span>
            </MainItem>
            <Message>위의 계좌로 입금 완료 후 아래 버튼을 눌러주세요.</Message>
          </ModalMain>
          <Footer>
            <Button
              width="50%"
              onClick={() => setIsModal(false)}
              background="var(--color-mint)"
            >
              취소
            </Button>
            <Button
              width="50%"
              onClick={onComplete}
              background="var(--color-mint)"
              color="white"
              _hover={{ background: "var(--color-mint)" }}
            >
              입금완료
            </Button>
          </Footer>
        </>
      )}
    </ModalLayout>
  );
}

const MainItem = styled.div`
  margin: 4px 0;
  display: flex;

  > span:first-child {
    display: inline-block;
    width: 100px;
    font-weight: 600;
    color: var(--font-h1);
  }
  > div {
    span:first-child {
      margin-right: 8px;
    }
  }
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
