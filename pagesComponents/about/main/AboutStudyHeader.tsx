import { Button } from "@chakra-ui/react";
import { faCheck, faSquareCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../../components/common/masks/skeleton/Skeleton";
import LocationSelector from "../../../components/features/picker/LocationSelector";
import ModalPortal from "../../../components/modal/ModalPortal";
import StudyCheckModal from "../../../modals/study/StudyCheckModal";
import { isMainLoadingState } from "../../../recoil/loadingAtoms";
import {
  myStudyFixedState,
  studyDateStatusState,
} from "../../../recoil/studyAtoms";

function AboutStudyHeader() {
  const { data: session } = useSession();

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudyFixed = useRecoilValue(myStudyFixedState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  const [isModal, setIsModal] = useState(false);
  const [isCheck, setIsCheck] = useState<Boolean>(null);

  //출석체크 했는지 판단
  useEffect(() => {
    setIsCheck(null);
    if (!myStudyFixed) return;
    const myCheck = !!myStudyFixed?.attendences.find(
      (who) => who.user.uid === session?.uid
    )?.arrived;
    setIsCheck(!!myCheck);
  }, [myStudyFixed, myStudyFixed?.attendences, session?.uid, studyDateStatus]);

  return (
    <>
      <Layout>
        <Title isNotPassed={studyDateStatus !== "not passed"}>
          <span>
            {studyDateStatus === "not passed"
              ? "카공 스터디"
              : "내 스터디 결과"}
          </span>
          {isMainLoading && studyDateStatus === "today" ? (
            <ButtonSkeleton>
              <Skeleton>temp</Skeleton>
            </ButtonSkeleton>
          ) : isCheck ? (
            <Check>
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </Check>
          ) : (
            myStudyFixed &&
            isCheck !== null && (
              <Button
                leftIcon={<FontAwesomeIcon icon={faSquareCheck} />}
                onClick={() => setIsModal(true)}
                background="mint"
                color="white"
                size="sm"
                marginLeft="var(--margin-sub)"
              >
                출석체크
              </Button>
            )
          )}
        </Title>
        <LocationSelector />
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <StudyCheckModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 62px;
  padding: var(--padding-main);

  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 800;
`;
const Title = styled.div<{ isNotPassed: boolean }>`
  font-size: ${(props) => (props.isNotPassed ? "16px" : null)};
  display: flex;
  align-items: center;
`;

const Check = styled.span`
  color: var(--color-red);
  margin-left: var(--margin-sub);
`;
const ButtonSkeleton = styled.div`
  margin-left: var(--margin-sub);
  width: 84px;
  height: 28px;
`;
export default AboutStudyHeader;
