import { faCheckDouble, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { USER_GUIDE } from "../../constants/localStorage";
import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
  ModalXXL,
} from "../../styles/layout/modal";

function UserGuidePopUp({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const onClick = () => {
    setIsModal(false);
    localStorage.setItem(USER_GUIDE, "read");
  };

  return (
    <Layout>
      <ModalHeaderCenter>
        <span>
          <FontAwesomeIcon
            icon={faCheckDouble}
            color="var(--color-red)"
            size="sm"
          />
          &nbsp; 신규회원 가이드 &nbsp;
          <FontAwesomeIcon
            icon={faCheckDouble}
            color="var(--color-red)"
            size="sm"
          />
        </span>
        <div>기본적인 내용은 알고 쓰자!</div>
      </ModalHeaderCenter>
      <hr />
      <ModalMain>
        <Item>
          <Category>
            <FontAwesomeIcon
              icon={faThumbTack}
              color="var(--color-red)"
              size="sm"
            />
            &nbsp;
            <span>스터디</span>
          </Category>
          <Content>
            <li>스터디 결과는 매일 오후 10시에 발표 !</li>
            <li>3명 이상의 인원이 시간이 겹치는 경우에 Open !</li>
            <li>출석체크를 통해 참여 멤버의 위치를 확인 !</li>
          </Content>
        </Item>
        <Item>
          <Category>
            <FontAwesomeIcon
              icon={faThumbTack}
              color="var(--color-red)"
              size="sm"
            />
            &nbsp;
            <span>참여 규칙</span>
          </Category>
          <Content>
            <li>한 달에 최소 1회 이상 참여 필수 !</li>
            <li>스터디 모임도 하나의 약속입니다 ! 타인 배려 !</li>
            <li>스터디 시작시간 이전까지는 시간 변경 자유 !</li>
            <li>참여 시작시간에서 1시간 이상 늦으면 지각 !</li>
          </Content>
        </Item>{" "}
        <Item>
          <Category>
            <FontAwesomeIcon
              icon={faThumbTack}
              color="var(--color-red)"
              size="sm"
            />
            &nbsp;
            <span>서비스 이용</span>
          </Category>
          <Content>
            <li>오류 및 이용 문의는 관리자에게 ! 금방 해결 됨 !</li>
            <li>모든 건의사항 환영 !</li>
            <li>다들 재밌는 활동 해봐요~!</li>
          </Content>
        </Item>
      </ModalMain>
      <ModalFooterNav>
        <button onClick={onClick}>확인</button>
      </ModalFooterNav>
    </Layout>
  );
}

const Layout = styled(ModalXXL)``;

const Item = styled.div`
  margin-bottom: 12px;
`;

const Category = styled.span`
  > span:last-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 14px;
  }
`;

const Content = styled.ul`
  margin-top: 4px;
  margin-left: 24px;
  line-height: 1.8;
`;

export default UserGuidePopUp;
