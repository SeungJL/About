import { TABLE_COLORS } from "../styles";

type Content = {
  content: string;
  start: number;
  end: number;
  color: string;
  text: string;
};

export const EVENT_CONTENT_2023: Record<string, Content[]> = {
  10: [
    {
      content: "[10월] 에타 홍보 이벤트",
      start: 2,
      end: 29,
      color: TABLE_COLORS[2],
      text: "에타에 동아리 홍보글을 올려주시면 100 포인트와 추첨을 통해 치킨 기프티콘을 드려요!",
    },
    {
      content: "[시험기간] 랜덤선물 이벤트",
      start: 15,
      end: 22,
      color: TABLE_COLORS[0],
      text: "항상 돌아오는 시험기간 파이팅 이벤트... 매일 단톡방에서 랜덤한 선착순 선물을 뿌립니다!",
    },
    {
      content: "[시험기간] 스터디 투표 2배 이벤트 ",
      start: 16,
      end: 27,
      color: TABLE_COLORS[3],
      text: "시험 기간에 스터디에 투표하면 점수를 2배로 받아요!",
    },
    {
      content: "[오프라인] 번개 이벤트",
      start: 29,
      end: 31,
      color: TABLE_COLORS[6],
      text: "진행 예정",
    },
  ],
};
