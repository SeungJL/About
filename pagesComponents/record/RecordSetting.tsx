import dayjs from "dayjs";
import { SetStateAction, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isRecordLoadingState } from "../../recoil/loadingAtoms";
import { IArrivedData } from "../../types/study/studyRecord";

interface IRecordSetting {
  openData: IArrivedData[];
  month: number;
  setMonthData: React.Dispatch<SetStateAction<IArrivedData[]>>;
  monthData: IArrivedData[];
}

function RecordSetting({
  openData,
  month,
  setMonthData,
  monthData,
}: IRecordSetting) {
  const setIsRecordLoading = useSetRecoilState(isRecordLoadingState);
  const dayjsMonth = dayjs().month(month);

  useEffect(() => {
    if (!openData) return;
    const daysInMonth = dayjsMonth.daysInMonth();
    const startDayInMonth = dayjsMonth.date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;

    const temp: IArrivedData[] = Array.from(
      { length: 7 * rowsInMonth },
      (_, i) =>
        i < startDayInMonth || i >= startDayInMonth + daysInMonth
          ? null
          : { date: i - startDayInMonth + 1, arrivedInfoList: [] }
    );
    openData?.forEach((element) => {
      const infoDate = dayjs(element.date).date();

      if (temp[startDayInMonth + infoDate - 1]) {
        temp[startDayInMonth + infoDate - 1].arrivedInfoList =
          element.arrivedInfoList;
      }
    });

    setMonthData(temp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openData]);

  useEffect(() => {
    if (monthData?.length === 0) return;
    setIsRecordLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthData]);
  return null;
}

export default RecordSetting;
