import styled from "styled-components";

const Text = styled.p`
  font-size: 13px;
  font-family: "--apple-system";
  > b {
    line-height: 1.5;
  }
`;

export const noticeData: any = [
  {
    date: "2월 6일",
    title: "출석체크 관련 오류 수정 및 다크모드 비활성화",
    text: (
      <Text>
        출석체크 기능이 동작하지 않던 현상 수정
        <br />
        다크모드 비활성화
      </Text>
    ),
    category: "notice",
  },
  {
    date: "2월 5일",
    title: "투표 버튼/투표 결과 관련 오류 수정",
    text: (
      <Text>
        당일 참여 Join 기능이 작동되지 않던 현상 수정
        <br />
        투표 취소시 바로 Vote로 변경되지 않는 현상 수정
        <br />
        투표 기간이 지났음에도 결과가 Voting...으로 출력되던 현상 수정
      </Text>
    ),
    category: "notice",
  },
  {
    date: "2월 2일",
    title: "다크모드 관련",
    text: (
      <Text>
        현재 웹 사이트는 다크모드로 지원하지 않고 있습니다. 해당 설정이 되어있는
        경우, 메인페이지 우측 상단의 설정에 들어가서 라이트모드로 변경해주시기
        바랍니다.
      </Text>
    ),
    category: "notice",
  },
  {
    date: "2월 1일",
    title: "필독 - 웹사이트 리모델링 공지",
    text: (
      <Text>
        2월부터는 새로운 웹사이트로 동아리가 운영 됩니다. 완성된 모습으로
        시작하는 것이 아니라 지속적으로 컨텐츠, 디자인, 기 능 등을 계속해서
        업데이트 할 예정입니다. 최종적으로는 단순한 스터디 시 스템을 넘어서
        유용한 정보들과 도움, 재미까지 얻을 수 있는 큰 규모의 커뮤니티 로
        확장하는 것이 목표입니다. 단순한 의견이나 건의사항부터 디자인, 기능,
        컨텐츠, 오류등 어떤 것이든 좋으니 많은 피드백을 제공 해주시면
        좋겠습니다. 조만간 이러한 피드백이나 의견, 투표를 받을 수 있는 페 이지
        또한 제공 될 것입니다. 마지막으로 해당 프로젝트는 스터디 일원인
        &#39;형림&#39;님이 개발했던 기존의 웹사이트를 기반으로 제작되고 있으며,
        마찬가지로 스터디 일원인 &#39;민관&#39;님이 서버쪽 개발을 맡아주실
        예정임을 밝힙니다.
      </Text>
    ),
    category: "notice",
  },
  {
    date: "2월 1일",
    title: "2/1 현재 오류 내용",
    text: (
      <Text>
        투표 취소시 바로 버튼이 바뀌지 않는 현상
        <br />
        출석체크와 당일참여 버튼이 동작하지 않음 <br />
        투표 확정 알고리즘이 제대로 동작하지 않아, 인원 3명 이상인 경우 열리게
        설정 <br />
      </Text>
    ),
    category: "notice",
  },
  {
    date: "2월 1일",
    title: "Test",
    text: <Text>test</Text>,
    category: "notice",
  },
  {
    date: "2월 1일",
    title: "메인 페이지 설계",
    text: (
      <Text>
        <b>투표 날짜 이동:</b> Yesterday/Tomorrow.
        <br />
        <b>투표 버튼:</b> Vote - 투표, Voted - 투표 완료, Check - 출석체크, Join
        - 스터디 당일 참여(미구현), Closed - 기간 지난 상태 <br />
        <b>투표 결과 버튼:</b> Block - 투표 인원 수, Voter - 투표 인원 프로필,
        Closed - 안 열린 스터디, Open - 오픈 스터디(클릭 시 스터디 참여 인원
        타임 테이블), Cancel - 당일 불참. <br />
        <b> 상단 네비게이션:</b> 공지사항&릴리즈노트/유저 정보,
      </Text>
    ),
    category: "release",
  },
  {
    date: "2월 1일",
    title: "Test",
    text: <Text>test</Text>,
    category: "release",
  },
  {
    date: "2월 1일",
    title: "Test",
    text: <Text>test</Text>,
    category: "release",
  },
];
