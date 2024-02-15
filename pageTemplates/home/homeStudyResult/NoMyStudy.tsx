import { Button } from "@chakra-ui/react";
import { faSparkles } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../../../hooks/custom/CustomToast";
import StudyVoteMainModal from "../../../../modals/study/studyVoteMainModal/StudyVoteMainModal";
import { isGuestState } from "../../../../recoil/userAtoms";

function NoMyStudy() {
  const failToast = useFailToast();
  const isGuest = useRecoilValue(isGuestState);
  const [isFreeOpenModal, setIsFreeOpenModal] = useState(false);

  const onClickFreeOpen = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    setIsFreeOpenModal(true);
  };

  return (
    <>
      <Layout>
        <Text>오늘은 스터디가 없어요 !</Text>
        <SubText>
          직접 스터디를 오픈 할 수 있습니다.
          <Button
            leftIcon={<FontAwesomeIcon icon={faSparkles} size="sm" />}
            rightIcon={<FontAwesomeIcon icon={faSparkles} size="sm" />}
            onClick={onClickFreeOpen}
            colorScheme="mintTheme"
            size="xs"
            color="mint"
            variant="ghost"
          >
            오픈 신청
          </Button>
        </SubText>
      </Layout>
      {isFreeOpenModal && (
        <StudyVoteMainModal setIsModal={setIsFreeOpenModal} isFreeOpen={true} />
      )}
    </>
  );
}

const Layout = styled.div``;

const Text = styled.div`
  height: 110px;
  background-color: var(--gray-7);
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  border-radius: var(--rounded-lg);
  font-size: 15px;
  color: var(--gray-1);
`;

const SubText = styled.div`
  margin: var(--gap-1) 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 11px;
  color: var(--gray-4);
`;

export default NoMyStudy;
