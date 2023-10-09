import { Button } from "@chakra-ui/react";
import { faClock } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { useCompleteToast } from "../../hooks/CustomToast";
import { usePromotionMutation } from "../../hooks/promotion/mutations";
import { usePromotionQuery } from "../../hooks/promotion/queries";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

interface IPromotionApplyModal extends IModal {
  uniName: string;
}

function PromotionApplyModal({ setIsModal, uniName }: IPromotionApplyModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();

  const [contentType, setContentType] = useState<"cool" | "none">();
  const [coolTime, setCoolTime] = useState<number>();

  const { data } = usePromotionQuery();

  const { mutate } = usePromotionMutation({
    onSuccess() {
      completeToast("free", "포인트 지급 완료! 감사합니다!");
      setIsModal(false);
    },
  });
  const { mutate: sendRequest } = useUserRequestMutation();

  const onSubmit = () => {
    const findUni = data?.find((item) => item.name === uniName);
    if (!findUni) setContentType("none");
    else {
      const diff = dayjs(findUni.lastDate)
        .add(3, "day")
        .subtract(9, "hours")
        .diff(dayjs(), "hour");

      if (diff <= 0) mutate(uniName);
      else {
        setContentType("cool");
        setCoolTime(diff);
      }
    }
  };

  const handleApply = () => {
    sendRequest({ category: "홍보", writer: session.user.name });
    mutate(uniName);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="이벤트 보상 신청" setIsModal={setIsModal} />
      <>
        {!contentType ? (
          <>
            <ModalMain>
              <ModalSubtitle>
                홍보글 게시를 진행해 주셨나요?
                <br /> + 100 Point와 추첨을 통해 치킨 기프티콘을 드려요!
              </ModalSubtitle>
              <Uni>
                <span>학교:</span>
                <span>{uniName}</span>
              </Uni>
            </ModalMain>
            <Footer>
              <Button w="50%" onClick={() => setIsModal(false)}>
                다음에
              </Button>
              <Button w="50%" colorScheme="mintTheme" onClick={onSubmit}>
                게시완료
              </Button>
            </Footer>
          </>
        ) : contentType === "cool" ? (
          <>
            <ModalMain>
              <ModalSubtitle>
                아직 신청 쿨타임이 지나지 않았어요!
                <br />
                쿨타임이 끝난 뒤에 다시 신청해주세요!
              </ModalSubtitle>
              <CoolTime>
                <FontAwesomeIcon icon={faClock} />
                <span>
                  {coolTime >= 24 ? Math.ceil(coolTime / 24) : coolTime}{" "}
                  {coolTime >= 24 ? "일" : "시간"}
                </span>
              </CoolTime>
            </ModalMain>
            <Footer>
              <Button
                colorScheme="mintTheme"
                w="100%"
                onClick={() => setIsModal(false)}
              >
                확인
              </Button>
            </Footer>
          </>
        ) : (
          <>
            <ModalMain>
              <ModalSubtitle>
                처음 홍보를 진행하는 대학교예요! <br />
                대학교 목록에 {uniName}를 추가 후 진행할게요! 최초 등록시 +300
                point가 지급됩니다.
              </ModalSubtitle>
              <SubMessage>(자동으로 진행됩니다)</SubMessage>
            </ModalMain>
            <Footer>
              <Button w="50%" onClick={() => setIsModal(false)}>
                다음에
              </Button>
              <Button w="50%" colorScheme="mintTheme" onClick={handleApply}>
                확인
              </Button>
            </Footer>
          </>
        )}
      </>
    </ModalLayout>
  );
}

const Footer = styled.footer``;

const Uni = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: 600;
  > span:last-child {
    margin-left: var(--margin-min);
    color: var(--color-mint);
  }
`;

const CoolTime = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-mint);
  border-radius: var(--border-radius-main);
  color: var(--color-mint);
  font-weight: 600;
  font-size: 14px;
  > span {
    margin-left: var(--margin-md);
  }
`;

const SubMessage = styled.span`
  color: var(--font-h3);
  font-size: 12px;
`;

export default PromotionApplyModal;
