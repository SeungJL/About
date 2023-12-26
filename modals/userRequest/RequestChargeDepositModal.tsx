import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ACCOUNT_SHORT } from "../../constants/contents/Private";
import { USER_INFO } from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
} from "../../hooks/custom/CustomToast";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { usePointSystemQuery } from "../../hooks/user/queries";
import { useUserRequestMutation } from "../../hooks/user/sub/request/mutations";
import { IModal } from "../../types/reactTypes";
import { IUserRequest } from "../../types/user/userRequest";

function RequestChargeDepositModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const [isFirst, setIsFirst] = useState(true);

  const resetQueryData = useResetQueryData();

  const { data: deposit } = usePointSystemQuery("deposit");
  const { mutate: sendRequest } = useUserRequestMutation();
  const { mutate: getDeposit, isLoading } = usePointSystemMutation("deposit", {
    onSuccess() {
      completeToast("success");
      resetQueryData([USER_INFO], () => setIsModal(false));
    },
    onError: errorToast,
  });

  const onComplete = () => {
    const userRequestInfo: IUserRequest = {
      category: "충전",
      writer: session.user.name,
    };
    sendRequest(userRequestInfo);
    getDeposit({ value: 2000, message: "보증금 충전" });
  };

  const myDeposit = deposit;

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="lg">
      <ModalHeader text="보증금 충전" />
      <ModalBody>
        {myDeposit &&
          (isFirst ? (
            <>
              <MainItem>
                <span>보유 보증금</span>
                <MyDeposit>{myDeposit}원</MyDeposit>
              </MainItem>
              <MainItem>
                <span>충전 금액</span>
                <ChargeDeposit>+ 2000원</ChargeDeposit>
              </MainItem>
              <Hr />
              <MainItem>
                <span>충전 후 보증금</span>
                <span>= {myDeposit + 2000}원</span>
              </MainItem>
            </>
          ) : (
            <>
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
                <span>2000원</span>
              </MainItem>
              <Message>위의 계좌로 입금 후 완료 버튼을 눌러주세요!</Message>
            </>
          ))}
      </ModalBody>
      <ModalFooterTwo
        isLoading={isLoading}
        leftText="닫기"
        rightText={isFirst ? "충전 신청" : "입금 완료"}
        onClickLeft={() => setIsModal(false)}
        onClickRight={() => (isFirst ? setIsFirst(false) : onComplete())}
        isFull={true}
      />
    </ModalLayout>
  );
}

const MainItem = styled.div`
  padding: var(--padding-md) 0;
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
  background-color: var(--font-h56);
  margin: var(--margin-min) 0;
`;

const MyDeposit = styled.span`
  margin-left: var(--margin-sub);
`;

const ChargeDeposit = styled.span`
  color: var(--color-mint);
`;

const Message = styled.div`
  padding-top: auto;
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Footer = styled.footer``;

export default RequestChargeDepositModal;
