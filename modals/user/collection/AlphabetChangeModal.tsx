import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AlphabetIcon } from "../../../components/common/Icon/AlphabetIcon";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import {
  useCompleteToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useInteractionMutation } from "../../../hooks/user/sub/interaction/mutations";
import { isGuestState, userInfoState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/reactTypes";
import { Alphabet } from "../../../types/user/collections";

interface IAlphabetChangeModal extends IModal {
  myAlphabets: Alphabet[];
  opponentAlpabets: Alphabet[];
  toUid: string;
}

function AlphabetChangeModal({
  setIsModal,
  myAlphabets,
  toUid,
  opponentAlpabets,
}: IAlphabetChangeModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const isGuest = useRecoilValue(isGuestState);
  const userInfo = useRecoilValue(userInfoState);

  const { mutate: requestAlphabet } = useInteractionMutation(
    "alphabet",
    "post",
    {
      onSuccess() {
        completeToast("free", "요청을 전송했습니다.");
        setIsModal(false);
      },
    }
  );

  const [selectedAlphabet, setSelectedAlphabet] = useState<{
    mine: Alphabet;
    opponent: Alphabet;
  }>({ mine: null, opponent: null });

  const onClickAlphabet = (type: "mine" | "opponent", alphabet: Alphabet) => {
    const alphabets = type === "opponent" ? opponentAlpabets : myAlphabets;
    const failMessage =
      type === "opponent"
        ? "상대가 해당 알파벳을 보유하고 있지 않습니다."
        : "해당 알파벳을 보유하고 있지 않습니다.";

    if (!alphabets.includes(alphabet)) {
      failToast("free", failMessage);
      return;
    }

    setSelectedAlphabet((old) => ({
      ...old,
      [type]: old[type] === alphabet ? null : alphabet,
    }));
  };

  const handleAlphabetChange = () => {
    if (!selectedAlphabet.mine || !selectedAlphabet.opponent) {
      failToast("free", "교환 할 알파벳을 선택해주세요.");
      return;
    }
    requestAlphabet({
      message: `${userInfo.name}님의 알파벳 교환 요청`,
      toUid: toUid,
      sub: `${selectedAlphabet.mine}/${selectedAlphabet.opponent}`,
    });
  };
  const ABOUT: Alphabet[] = ["A", "B", "O", "U", "T"];

  return (
    <ModalLayout size="lg" onClose={() => setIsModal(false)}>
      <ModalHeader text="알파벳 교환 신청" />
      <ModalBody>
        <SectionTitle>상대 보유</SectionTitle>
        <AlphabetContainer>
          {ABOUT.map((alphabet) => (
            <AlphabetBtn
              isSelected={alphabet === selectedAlphabet?.opponent}
              key={alphabet}
              onClick={() => onClickAlphabet("opponent", alphabet)}
            >
              <AlphabetIcon
                alphabet={alphabet}
                isDuotone={!opponentAlpabets?.includes(alphabet)}
              />
            </AlphabetBtn>
          ))}
        </AlphabetContainer>
        <SectionTitle style={{ marginTop: "auto" }}>내 보유</SectionTitle>
        <AlphabetContainer>
          {ABOUT.map((alphabet) => (
            <AlphabetBtn
              isSelected={alphabet === selectedAlphabet?.mine}
              key={alphabet}
              onClick={() => onClickAlphabet("mine", alphabet)}
            >
              <AlphabetIcon
                alphabet={alphabet}
                isDuotone={!myAlphabets?.includes(alphabet)}
              />
            </AlphabetBtn>
          ))}
        </AlphabetContainer>
      </ModalBody>
      <ModalFooterOne
        isFull={true}
        text="교환 신청"
        onClick={handleAlphabetChange}
      />
    </ModalLayout>
  );
}

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-2);
`;

const AlphabetContainer = styled.div`
  margin-top: var(--gap-2);
  display: flex;
  justify-content: space-around;
  font-size: 14px;

  align-items: center;
`;

const AlphabetBtn = styled.button<{ isSelected: boolean }>`
  padding: 12px;
  height: 46px;
  width: 46px;
  border-radius: var(--rounded-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.isSelected
      ? "2px solid var(--color-mint)"
      : "2px solid var(--gray-5)"};
`;

export default AlphabetChangeModal;
