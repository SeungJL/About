import { Button } from "@chakra-ui/react";
import { faCheck, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../../components/ModalPortal";
import LocalSelector from "../../../../components/SpaceLocalSelector";
import CheckVoteModal from "../../../../modals/study/vote/AttendCheckModal";
import {
  attendCheckState,
  mySpaceFixedState,
  studyDateState,
} from "../../../../recoil/studyAtoms";
import AboutMainItem from "./AboutMainItem";
import NoMyStudy from "./NoMyStudy";

function AboutTitle() {
  const studyDate = useRecoilValue(studyDateState);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const isCheck = useRecoilValue(attendCheckState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  return (
    <>
      <Layout>
        <Header>
          <div>
            <TitleName isNotPassed={studyDate !== "not passed"}>
              {studyDate === "not passed" ? "카공 스터디" : "내 스터디 결과"}
              {!mySpaceFixed ? null : isCheck ? (
                <Check>
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                </Check>
              ) : (
                <Button
                  leftIcon={<FontAwesomeIcon icon={faSquareCheck} />}
                  onClick={() => setIsCheckModal(true)}
                  background="mint"
                  color="white"
                  size="sm"
                  marginLeft="12px"
                >
                  출석체크
                </Button>
              )}
            </TitleName>
          </div>
          {studyDate === "not passed" && <LocalSelector />}
        </Header>
        {studyDate !== "not passed" && (
          <>
            <Result>
              {mySpaceFixed !== null ? (
                <AboutMainItem studySpaceInfo={mySpaceFixed} voted={true} />
              ) : (
                <NoMyStudy />
              )}
            </Result>
            <HrDiv />
          </>
        )}
      </Layout>{" "}
      {isCheckModal && (
        <ModalPortal setIsModal={setIsCheckModal}>
          <CheckVoteModal setIsModal={setIsCheckModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 16px 14px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  font-weight: 800;
`;

const TitleName = styled.div<{ isNotPassed: boolean }>`
  font-size: ${(props) => (props.isNotPassed ? "16px" : null)};
  display: flex;

  align-items: center;
`;

const Check = styled.span`
  color: var(--color-red);
  margin-left: 12px;
`;

const Result = styled.div`
  margin: 16px 0;

  > span {
    display: inline-block;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 18px;
  }
`;

const HrDiv = styled.div`
  height: 1px;
  background-color: var(--font-h5);
  margin-bottom: 12px;
`;
export default AboutTitle;
