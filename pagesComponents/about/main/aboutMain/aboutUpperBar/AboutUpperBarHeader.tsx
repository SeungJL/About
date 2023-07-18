import { Button } from "@chakra-ui/react";
import { faCheck, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../../../components/common/ModalPortal";
import Skeleton from "../../../../../components/common/skeleton/Skeleton";
import LocationSelector from "../../../../../components/features/selector/LocationSelector";
import StudyCheckModal from "../../../../../modals/study/StudyCheckModal";
import { isMainLoadingState } from "../../../../../recoil/loadingAtoms";
import {
  myStudyFixedState,
  studyDateState,
} from "../../../../../recoil/studyAtoms";

function AboutUpperBarHeader() {
  const { data: session } = useSession();

  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(myStudyFixedState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  const [isModal, setIsModal] = useState(false);

  const isCheck = !!mySpaceFixed?.attendences.find(
    (who) => who.user.uid === session?.uid
  )?.arrived;

  return (
    <>
      <Layout>
        <Title isNotPassed={studyDate !== "not passed"}>
          <span>
            {studyDate === "not passed" ? "카공 스터디" : "내 스터디 결과"}
          </span>
          {isMainLoading && studyDate === "today" ? (
            <ButtonSkeleton>
              <Skeleton>temp</Skeleton>
            </ButtonSkeleton>
          ) : (
            mySpaceFixed &&
            (isCheck ? (
              <Check>
                <FontAwesomeIcon icon={faCheck} size="lg" />
              </Check>
            ) : (
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
            ))
          )}
        </Title>
        <LocationSelector />
      </Layout>{" "}
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <StudyCheckModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
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
export default AboutUpperBarHeader;
