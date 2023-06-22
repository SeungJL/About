import { Button, useToast } from "@chakra-ui/react";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/ui/Modal";
import { useGatherParticipate } from "../../hooks/gather/mutations";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { birthToAge } from "../../libs/utils/membersUtil";
import { gatherDataState } from "../../recoil/interactionAtoms";
import { ModalMain, ModalXs } from "../../styles/layout/modal";

function ApplyParticipationModal({
  setIsModal,
  setIsRefetching,
}: {
  setIsModal?: React.Dispatch<SetStateAction<boolean>>;
  setIsRefetching?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const failToast = useFailToast({ type: "applyGather" });
  const failPreApplyToast = useFailToast({ type: "applyPreGather" });
  const completeToast = useCompleteToast({ type: "applyGather" });
  const [isFirst, setIsFirst] = useState(true);
  const { data } = useUserInfoQuery();
  const gatherData = useRecoilValue(gatherDataState);
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [isGenderCondition, setIsGenderCondition] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const currentVoter = gatherData?.participants.length;

  const onClickPre = () => {
    setIsFirst(false);
  };

  const { mutate } = useGatherParticipate({
    onSuccess() {
      console.log("suc");
    },
  });

  const gatherId = gatherData?.id;

  const onApply = (type: "normal" | "pre") => {
    if (type === "pre") {
      if (password === gatherData?.password) {
        mutate({ gatherId });
      } else {
        failPreApplyToast();
      }
      setIsModal(false);
      return;
    }
    const myOld = birthToAge(data.birth);

    if (+myOld < gatherData.age[0] || +myOld > gatherData.age[1]) {
      toast({
        title: "신청 불가",
        description: "나이 조건이 맞지 않습니다",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (gatherData?.memberCnt.max - (gatherData?.preCnt || 0) <= currentVoter) {
      toast({
        title: "신청 불가",
        description: "모집 인원이 가득찼어요!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (gatherData?.genderCondition) {
      const participants = gatherData?.participants;
      const manCnt = participants.filter((who) => who.gender === "남성").length;
      const womanCnt = participants.length - manCnt;

      if (data?.gender === "남성") {
        if (
          (womanCnt === 0 && manCnt >= 3) ||
          (womanCnt === 1 && manCnt >= 4) ||
          (womanCnt >= 2 && manCnt >= womanCnt * 2)
        ) {
          toast({
            title: "신청 불가",
            description: "현재 성별 조건이 맞지 않아 신청이 불가능합니다.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      }
      if (data?.gender === "여성") {
        if (
          (manCnt === 0 && womanCnt >= 3) ||
          (manCnt === 1 && womanCnt >= 4) ||
          (manCnt >= 2 && womanCnt >= manCnt * 2)
        ) {
          toast({
            title: "신청 불가",
            description: "현재 성별 조건이 맞지 않아 신청이 불가능합니다.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      }
    }

    mutate({ gatherId });
    completeToast();
    setIsRefetching(true);
    setIsModal(false);
  };

  return (
    <>
      <Layout>
        <ModalHeaderX title="참여신청" setIsModal={setIsModal} />

        <ModalMain>
          {isFirst ? (
            <Main>
              <Button
                color="white"
                backgroundColor="var(--color-mint)"
                marginBottom="16px"
                size="lg"
                onClick={() => onApply("normal")}
              >
                일반 참여 신청
              </Button>
              <Button onClick={onClickPre} size="lg">
                사전 확정 인원
              </Button>
            </Main>
          ) : (
            <Main>
              <CodeText>전달 받은 암호 네자리를 입력해 주세요.</CodeText>
              <div>
                <FontAwesomeIcon icon={faUnlock} color="var(--font-h4)" />
                <Input
                  placeholder="암호 입력"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </Main>
          )}
        </ModalMain>
        {!isFirst && (
          <Footer>
            <Button width="50%" onClick={() => setIsFirst(true)}>
              뒤로가기
            </Button>
            <Button
              color="white"
              backgroundColor="var(--color-mint)"
              width="50%"
              onClick={() => onApply("pre")}
            >
              신청 완료
            </Button>
          </Footer>
        )}
      </Layout>
    </>
  );
}

const Layout = styled(ModalXs)``;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  > div:last-child {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  margin-left: 8px;
  background-color: var(--font-h7);
  padding: 4px 8px;
  border-radius: var(--border-radius);
`;

const Footer = styled.footer``;

const CodeText = styled.span``;

export default ApplyParticipationModal;
