import { faCheckDouble, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { PopUpLayout } from "../../components/common/modal/Modals";
import { USER_GUIDE } from "../../constants/localStorage";
import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
} from "../../styles/layout/modal";
import { IModal } from "../../types/common";

function UserGuidePopUp({ setIsModal }: IModal) {
  const onClick = () => {
    setIsModal(false);
    localStorage.setItem(USER_GUIDE, "read");
  };

  return (
    <PopUpLayout size="xxl">
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
            <li>
              매일 <b>오후 11시</b>에 스터디 결과 발표 !
            </li>
            <li>
              <b>3명 이상</b>의 인원이 참여하는 경우 Open !
            </li>
            <li>
              <b>출석체크</b>를 통해 자리나 인상착의 기록
            </li>
            <li>
              인사만 해도, 같이 공부를 해도, 밥을 먹어도 <b>OK</b>
            </li>
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
            <li>
              <b>오른쪽 상단의 동아리 이용가이드 확인하기 !</b>
            </li>
            <li>다양한 컨텐츠가 존재해요! 계속 생겨날 예정!</li>
            <li>오류 및 이용 문의는 관리자에게 ! 금방 해결 됨!</li>
            <li>다들 재밌는 활동 해봐요~!</li>
          </Content>
        </Item>
      </ModalMain>
      <ModalFooterNav>
        <button onClick={onClick}>확인</button>
      </ModalFooterNav>
    </PopUpLayout>
  );
}

const Item = styled.div`
  margin-bottom: var(--margin-sub);
`;

const Category = styled.span`
  > span:last-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 14px;
  }
`;

const Content = styled.ul`
  margin-top: var(--margin-min);
  margin-left: var(--margin-max);
  line-height: var(--line-height);
`;

export default UserGuidePopUp;
