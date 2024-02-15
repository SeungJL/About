import { Button } from "@chakra-ui/react";
import { Step } from "react-joyride";
import styled from "styled-components";

const Title = styled.span`
  font-weight: 700;
`;

const Content = styled.div`
  color: var(--gray-2);
`;

export const STEPS_CONTENTS: Step[] = [
  {
    content: (
      <Content>
        동아리에서 진행중인 컨텐츠와 웹사이트 기능 설명을 위한 안내
        가이드입니다!
      </Content>
    ),
    title: <Title>웹사이트 이용 가이드</Title>,
    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      skip: "나중에",
      back: "뒤로",
      close: "닫기",

      next: (
        <Button as={"div"} colorScheme="mintTheme">
          보여주세요!
        </Button>
      ),
    },

    placement: "center",
    target: "body",
  },
  {
    content: (
      <Content>
        원하는 장소와 시간에 스터디 신청을 할 수 있습니다. 매일 오후 11시에 결과
        발표!
      </Content>
    ),
    styles: {
      options: {
        width: 320,
      },
    },
    placement: "top",
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".main_vote_btn",
  },
  {
    content: (
      <Content>
        원하는 날짜로 이동할 수 있습니다. 스터디 투표를 미리 해놔도 포인트 획득!
      </Content>
    ),
    placement: "top",
    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_calendar",
  },
  {
    content: (
      <Content>
        스터디 상세 정보와 참여자를 알 수 있습니다. 좌우 스와이프로 날짜 이동도
        가능!
      </Content>
    ),
    placement: "top",
    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".study_space",
  },
  {
    content: (
      <Content>
        매일 출석체크, 포인트 가이드, 홍보 이벤트, 알림 페이지, 마이페이지가
        있어요!
      </Content>
    ),

    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_header",
  },
  {
    content: (
      <Content>동아리 및 나의 스터디 기록을 확인할 수 있습니다.</Content>
    ),

    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_navigation1",
  },
  {
    content: (
      <Content>
        랭킹 게시판과 상점이 있습니다. 포인트를 모아 상품을 구매해봐요!
      </Content>
    ),
    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_navigation2",
  },
  {
    content: (
      <Content>
        동아리원들의 프로필을 확인하고, 친구를 추천받을 수 있습니다.
      </Content>
    ),
    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_navigation3",
  },
  {
    content: (
      <Content>
        다양한 오프라인 모임에 참여하거나 직접 개설할 수 있습니다. 모임 리뷰도
        있어요!
      </Content>
    ),

    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_navigation4",
  },
  {
    content: (
      <Content>
        여러 분야의 스터디 및 소모임이 있습니다. 관심있는 모임에 가입해보세요!
      </Content>
    ),

    styles: {
      options: {
        width: 320,
      },
    },
    locale: {
      back: (
        <Button
          as={"div"}
          color="var(--color-mint)"
          borderColor="var(--color-mint)"
          variant="outline"
        >
          뒤로
        </Button>
      ),

      close: "닫기",
      skip: null,
      next: (
        <Button as={"div"} colorScheme="mintTheme">
          다음
        </Button>
      ),
    },
    spotlightPadding: 8,
    target: ".about_navigation5",
  },
  {
    content: (
      <Content>
        추가적으로 궁금한 내용은 마이페이지의 &lsquo;자주 묻는 질문&rsquo;을
        확인해주세요!
      </Content>
    ),
    title: <Title>환영해요!</Title>,
    styles: {
      options: {
        width: 320,
      },
    },

    locale: {
      back: null,
      skip: null,
      last: (
        <Button as={"div"} colorScheme="mintTheme">
          확인
        </Button>
      ),
    },

    placement: "center",
    target: "body",
  },
];
