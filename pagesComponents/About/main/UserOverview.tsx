import { Progress, useTheme } from "@chakra-ui/react";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import BadgeInfoModal from "../../../modals/info/BadgeInfoModal";

function UserOverview() {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Layout>
        <Header>이승주님의 성장 여정이에요.</Header>{" "}
        <ProgressWrapper>
          <Grade>
            <div>
              <GradeInfo>아메리카노 20 </GradeInfo>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                onClick={() => setIsModal(true)}
              />
            </div>
            <GradeInfo>카푸치노</GradeInfo>
          </Grade>
          <Progress value={20} h="24px" color="var(--font-h4)" />
        </ProgressWrapper>
        <Info>
          <Item>
            <span>이번 달 참여</span>
            <span>2회</span>
          </Item>
          <Item>
            <span>내 랭킹</span>
            <span>17%</span>
          </Item>
          <Item>
            <span>경고</span>
            <span>1회</span>
          </Item>
        </Info>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <BadgeInfoModal />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const Header = styled.header`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;
const ProgressWrapper = styled.div``;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GradeInfo = styled.span``;

const Info = styled.div`
  display: flex;
`;

const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default UserOverview;
