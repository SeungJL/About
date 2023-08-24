import styled from "styled-components";

export const StudyRuleModalContentSecondTip = () => (
  <Content>
    <ul>
      <li>
        날짜를 이동할 때 좌우 <b>스와이핑</b>으로 이동이 가능합니다.
      </li>
      <li>
        각 컨텐츠 페이지에는 설명을 위한 <b>가이드</b>가 존재합니다.
      </li>
      <li>
        <b>마이페이지</b>에서 건의나 신고, 프로필 수정, 설정 등 여러가지 기능을
        이용할 수 있습니다.
      </li>
      <li>
        <b>건의나 오류</b>를 제출하면 추첨을 통해 상품을 지급합니다. (간단한
        거든 뭐든 좋습니다!)
      </li>
    </ul>
  </Content>
);
export const StudyRuleModalContentSecondFee = () => (
  <Content>
    <ul>
      <li>
        지각(1시간 이상)/늦은 시간 변경:<b> -100원</b>
      </li>
      <li>
        당일 불참(스터디 시간 이전): <b>-300원</b>
      </li>
      <li>
        당일 불참(스터디 시간 이후): <b>-600원</b> / 잠수 <b>-1000원</b>
      </li>
      <li>
        월별 스터디 미참여(휴식/가입 달 제외): <b>-1000원</b>
      </li>
      <li>
        <b>출석 체크</b>를 기준으로 체크하니 잊지 말고 해주세요!
      </li>
      <li>벌금 기록은 마이페이지에서 확인할 수 있습니다.</li>
    </ul>
  </Content>
);

export const StudyRuleModalContentFirstOne = () => (
  <Content>
    <ul>
      <li>
        매일 <b>오후 11시</b>에 스터디 결과 발표 !
      </li>
      <li>
        <b>3명 이상</b>의 인원이 같은 시간에 참여하는 경우 Open !
      </li>
      <li>
        스터디가 열리지 않았다면 투표한 장소의 <b>Free 오픈</b>을 통해 개인이
        오픈할 수 있음 ! 자유롭게 출석 !
      </li>
    </ul>
  </Content>
);

export const StudyRuleModalContentFirstTwo = () => (
  <Content>
    <ul>
      <li>
        스터디에 참여하면 <b>출석체크</b>를 통해 자리나 인상착의 기록
      </li>
      <li>출석체크 기록을 통해 다른 인원을 확인할 수 있어요 !</li>
      <li>
        인사만 해도 <b>OK</b> 같이 공부를 해도 <b>OK</b> 같이 밥을 먹어도{" "}
        <b>OK</b>
      </li>
    </ul>
  </Content>
);

export const StudyRuleModalContentFirstThree = () => (
  <Content>
    <ul>
      <li>
        <b>다양한 컨텐츠</b>가 준비되어 있어요! 잘 모르겠는 건 아무나 붙잡고
        물어보면 그 분도 모르니까 관리자한테 질문!
      </li>
      <li>
        <b>
          다른 인원에게 피해를 끼치는 행위를 엄격하게 금지합니다 ! 불편한
          연락이나 상황이 있다면 관리자에게 연락해 주세요 !
        </b>
      </li>
    </ul>
  </Content>
);

const Content = styled.div`
  font-size: 11px;
  margin-left: var(--margin-main);
  margin-bottom: var(--margin-md);
  > ul {
    line-height: var(--line-height);
  }
`;
