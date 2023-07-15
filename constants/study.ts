export const MAX_USER_PER_PLACE = 8;
export const MIN_USER_FOR_STUDY = 3;

export const RESULT_OPEN_TIME = 14;
export const RESULT_CLOSE_TIME = 14;

export const STUDY_START_VOTETIME_HOUR = 10;

export const STUDY_VOTE_START_HOUR = 14;
export const STUDY_VOTE_END_HOUR = 23;

export const VOTER_DATE_END = 18;


export const STUDY_TIME_TABLE = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

export const STUDY_RANDOM_IMGAGE_LENGTH = 5;

export const TIME_SELECTOR_START = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const TIME_SELECTOR_END = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
export const TIME_SELECTOR_UNIT = Array.from({ length: 25 }, (_, index) => {
  const hour = Math.floor(index / 2) + 10;
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
}).slice(0, -1);

export const TIME_SELECTOR_MINUTES = ["00", "30"];

export const LOCATION_OPEN_DATE = {
  수원: "2023-04-07",
  양천: "2023-04-19",
};
