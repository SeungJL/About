export const USER_SCORE_BADGE_ARR = [
  "아메리카노",
  "그린티",
  "블루레몬",
  "라즈베리",
  "페퍼민트",
  "블루베리",
  "홍차",
  "라벤더",
] as const;

export const MANAGER_BADGE = "바닐라";

export const USER_EVENT_BADGE_ARR = [] as const;

export const USER_BADGE_ARR = [
  ...USER_SCORE_BADGE_ARR,
  ...USER_EVENT_BADGE_ARR,
  MANAGER_BADGE,
] as const;

export const BADGE_SCORE_MAPPINGS: {
  [key in typeof USER_SCORE_BADGE_ARR[number]]: number;
} = {
  아메리카노: 0,
  그린티: 20,
  블루레몬: 40,
  라즈베리: 60,
  페퍼민트: 80,
  블루베리: 100,
  홍차: 120,
  라벤더: 140,
};
export const BADGE_COLOR_MAPPINGS: {
  [key in typeof USER_BADGE_ARR[number]]: string;
} = {
  아메리카노: "light",
  그린티: "lime",
  블루레몬: "blue",
  라즈베리: "red",
  페퍼민트: "green",
  블루베리: "indigo",
  홍차: "pink",
  라벤더: "purple",
  바닐라: "yellow",
};
