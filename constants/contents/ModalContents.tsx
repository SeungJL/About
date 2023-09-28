export interface IPointSystemsModalContents {
  title: string;
  list: { subtitle: string; text: string }[];
}

interface IPointSystemsModal {
  ABOUT_POINT: IPointSystemsModalContents[];
}

export const POINT_SYSTEMS_MODAL: IPointSystemsModal = {
  ABOUT_POINT: [
    {
      title: "포인트 획득",
      list: [
        {
          subtitle: "출석체크",
          text: "5 point",
        },
        {
          subtitle: "스터디 투표",
          text: "5 point",
        },
        {
          subtitle: "스터디 투표",
          text: "5 point",
        },
      ],
    },
  ],
};
