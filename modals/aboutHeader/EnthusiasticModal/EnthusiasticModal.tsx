import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { RABBIT_POP_UP } from "../../../constants/keys/localStorage";
import {
  useCompleteToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useCounterQuery } from "../../../hooks/sub/counter/queries";
import { useUserInfoFieldMutation } from "../../../hooks/user/mutations";
import { locationState } from "../../../recoil/userAtoms";
import { ModalSubtitle } from "../../../styles/layout/modal";
import { DispatchBoolean, IModal } from "../../../types/reactTypes";
import ConfirmModal, { IConfirmContent } from "../../common/ConfirmModal";

interface IEnthusiasticModal extends IModal {
  setIsRabbitRun: DispatchBoolean;
}

const LOCATION_WIN = {
  수원: 3,
  양천: 5,
  안양: 6,
  강남: 6,
};

function EnthusiasticModal({ setIsModal, setIsRabbitRun }: IEnthusiasticModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const location = useRecoilValue(locationState);

  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const { data: memberCnt } = useCounterQuery("enthusiasticMember", location, {
    enabled: !!location,
  });

  useEffect(() => {
    localStorage.setItem(RABBIT_POP_UP, "read");
    setIsRabbitRun(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate } = useUserInfoFieldMutation("role", {
    onSuccess() {
      completeToast("free", "이번 달 열활멤버가 되었습니다!");
      setIsModal(false);
    },
  });

  const confirmContent: IConfirmContent = {
    title: "열활멤버에 지원하시겠어요?",
    onClickRight: () => {
      if (isExpired) {
        failToast("free", "이미 마감되었습니다.");
        setIsConfirmModal(false);
        return;
      }
      mutate({ role: "enthusiastic" });
    },
  };

  const isExpired = LOCATION_WIN[location] <= memberCnt;
  return (
    <>
      <ModalLayout size="xl" onClose={() => setIsModal(false)}>
        <ModalHeader text="12월 열활멤버 모집" />
        <ModalBody>
          <ModalSubtitle>매 달마다 열활멤버 신청을 받습니다.</ModalSubtitle>
          <CurrentMember>
            현재 인원:
            <span>{isExpired ? "모집 마감" : `${memberCnt}명` || 0}</span>
          </CurrentMember>
          <Container>
            <li>
              <b>모집 인원:</b> {LOCATION_WIN[location]}명
            </li>
            <li>
              <b>지원 조건</b>
            </li>
            <Condition>
              <li>만 20~23세의 대학생</li>
              <li>인원 당 1회만 등록 가능</li>
              <li>
                한달 동안
                <b>
                  <u>5번 스터디 참여</u>
                </b>
              </li>
              <span>(미오픈 투표, FREE 오픈, 개인스터디 = 2회당 1번)</span>
            </Condition>
            <Win>
              <b>현금 5000원</b>
              <br />
              <span>(이번만 5000원. 이후에는 포인트)</span>
            </Win>
          </Container>
        </ModalBody>
        <ModalFooterTwo
          leftText="닫기"
          rightText="지원"
          onClickLeft={() => setIsModal(false)}
          onClickRight={() => setIsConfirmModal(true)}
          isFull={true}
        />
      </ModalLayout>
      {isConfirmModal && (
        <ConfirmModal content={confirmContent} setIsModal={setIsConfirmModal} />
      )}
    </>
  );
}

const CurrentMember = styled.div`
  border: var(--border-mint);
  width: max-content;
  padding: var(--padding-min) var(--padding-md);
  border-radius: var(--border-radius-sub);
  font-size: 13px;
  > span {
    margin-left: var(--margin-min);
    color: var(--color-mint);
  }
`;

const Container = styled.ul`
  margin-top: var(--margin-sub);
  margin-left: var(--margin-main);
  font-size: 14px;
  line-height: var(--line-height);
`;

const Condition = styled.ol`
  margin-left: var(--margin-main);
  font-size: 13px;
  > li {
    > b {
      margin-left: var(--margin-min);
      color: var(--color-mint);
    }
  }
  > span {
    font-size: 12px;
    color: var(--font-h3);
  }
`;

const Win = styled.li`
  > span {
    font-size: 12px;
    color: var(--font-h3);
    margin-left: var(--margin-main);
  }
`;

export default EnthusiasticModal;
