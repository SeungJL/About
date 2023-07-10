import { Button, useToast } from "@chakra-ui/react";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/layouts/Modals";
import { useGatherParticipateMutation } from "../../hooks/gather/mutations";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { birthToAge } from "../../libs/utils/membersUtil";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";

import { ModalMain, ModalMd } from "../../styles/layout/modal";
import { ParticipationPhase } from "../../types/gather";

interface IGatherParticipateModal {
  setIsModal?: React.Dispatch<SetStateAction<boolean>>;
  setIsRefetching?: React.Dispatch<SetStateAction<boolean>>;
}

export interface IGatherParticipate {
  gatherId: number;
  phase: ParticipationPhase;
}

function GatherParticipateModal({
  setIsModal,
  setIsRefetching,
}: IGatherParticipateModal) {
  const failToast = useFailToast();
  // const failToast = useFailToast({ type: "applyGather" });

  const completeToast = useCompleteToast();
  const [isFirst, setIsFirst] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const { data } = useUserInfoQuery();
  const gatherData = useRecoilValue(transferGatherDataState);
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [isGenderCondition, setIsGenderCondition] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const currentVoter = gatherData?.participants.length;

  const gatherId = gatherData?.id;
  const { mutate: participate } = useGatherParticipateMutation(gatherId, {
    onError(err) {
      console.error(err);
    },
  });
  console.log(gatherData?.password);
  const onApply = (type: "normal" | "pre") => {
    if (type === "pre") {
      if (password === gatherData?.password) {
        setPageNum(2);
      } else {
        failToast("applyPreGather");
      }
      setIsModal(false);
      return;
    }
    const myOld = birthToAge(data.birth);

    if (gatherData?.user?.location !== data?.location)
      failToast("free", "참여할 수 없는 지역입니다.");

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

    if (
      gatherData.memberCnt.max !== 0 &&
      gatherData?.memberCnt.max - (gatherData?.preCnt || 0) <= currentVoter
    ) {
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
      const manCnt = participants.filter(
        (who) => who.user.gender === "남성"
      ).length;
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

    setPageNum(2);
  };

  const selectGatherTime = (time: "first" | "second") => {
    participate(time);
    completeToast("applyGather");
    setIsRefetching(true);
    setIsModal(false);
  };

  return (
    <>
      <Layout>
        <ModalHeaderX title="참여신청" setIsModal={setIsModal} />

        <ModalMain>
          {pageNum === 0 ? (
            <>
              <Main>
                <Button
                  color="white"
                  backgroundColor="var(--color-mint)"
                  marginBottom="16px"
                  height="48px"
                  fontSize="17px"
                  onClick={() => onApply("normal")}
                >
                  일반 참여 신청
                </Button>
                <Button
                  onClick={() => setPageNum(1)}
                  height="48px"
                  fontSize="17px"
                >
                  사전 확정 인원
                </Button>
              </Main>
              <Message>사전 확정 인원은 암호코드가 필요합니다.</Message>
            </>
          ) : pageNum === 1 ? (
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
          ) : (
            <>
              <Main>
                <Button
                  color="white"
                  backgroundColor="var(--color-mint)"
                  marginBottom="16px"
                  height="48px"
                  fontSize="17px"
                  onClick={() => selectGatherTime("first")}
                  _hover={{ bg: "var(--color-mint)" }}
                >
                  1차 참여 신청
                </Button>
                <Button
                  onClick={() => selectGatherTime("second")}
                  height="48px"
                  fontSize="17px"
                >
                  2차 참여 신청
                </Button>
              </Main>
              <Message>늦참의 경우 일단 신청 후 댓글에 남겨주세요!</Message>
            </>
          )}
        </ModalMain>
        {pageNum === 1 && (
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
              다음
            </Button>
          </Footer>
        )}
      </Layout>
    </>
  );
}

const Layout = styled(ModalMd)``;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-top: 16px;
  > div:last-child {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  margin-left: 8px;
  background-color: var(--font-h7);
  padding: 4px 8px;
  border-radius: var(--border-radius-sub);
`;

const Footer = styled.footer``;

const CodeText = styled.span``;

const Message = styled.span`
  display: inline-block;
  margin-top: 16px;
  color: var(--font-h3);
`;

export default GatherParticipateModal;
