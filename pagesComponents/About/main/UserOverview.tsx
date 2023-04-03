import { Badge, Icon, Progress, useTheme } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import BadgeInfoModal from "../../../modals/info/BadgeInfoModal";

function UserOverview() {
  const [isModal, setIsModal] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <Layout>
        <Header>
          <b>{session?.user.name}</b>님의 활동 현황이에요 !
        </Header>
        <ProgressWrapper>
          <Grade>
            <div>
              <Badge fontSize="12" marginRight="8px">
                아메리카노
              </Badge>
              <span>40점</span>
            </div>
            <Badge fontSize={12} variant="subtle" colorScheme="orange">
              라떼
            </Badge>
          </Grade>
          <Progress value={50} size="xs" color="var(--font-h4)" />
          <IconWrapper onClick={() => setIsModal(true)}>
            <span>등급</span>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </IconWrapper>
        </ProgressWrapper>
        <Info>
          <Item>
            <span>이번 달 참여</span>
            <span>2회</span>
          </Item>
          <HrCol />
          <Item>
            <span>내 점수</span>
            <span>130점</span>
          </Item>
          <HrCol />
          <Item>
            <span>랭킹</span>
            <span>상위 15%</span>
          </Item>
        </Info>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <BadgeInfoModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 14px;
  padding-bottom: 6px;
  border-bottom-left-radius: 17px;
`;

const Header = styled.header`
  padding: 12px 0px;
  font-size: 18px;
`;

const ProgressWrapper = styled.div`
  margin-bottom: 12px;

  position: relative;
`;

const IconWrapper = styled.div`
  color: var(--font-h3);
  font-size: 11px;
  position: absolute;
  right: 0%;
  bottom: -20px;
  > span:first-child {
    margin-right: 4px;
  }
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  align-items: center;
  > div {
    > span:nth-child(2) {
      font-size: 12px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  height: 54px;
  margin-top: 6px;
  > div:last-child {
    border: none;
  }
`;

const Item = styled.div`
  font-size: 13px;
  padding: 2px 0;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  > span:last-child {
    font-size: 14px;
    font-weight: 600;
  }
`;

const HrCol = styled.div`
  width: 1px;
  margin: 10px 0;
  background-color: var(--font-h5);
`;

export default UserOverview;
