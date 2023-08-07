import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import KakaoShareBtn from "../../../components/features/lib/KakaoShareBtn";
import Header from "../../../components/layout/Header";
import { WEB_URL } from "../../../constants/system";
import { prevPageUrlState } from "../../../recoil/previousAtoms";

interface IGatherHeader {
  title: string;
  date: Dayjs;
  locationMain: string;
}

function GatherHeader({ title, date, locationMain }: IGatherHeader) {
  const router = useRouter();

  const prevPageUrl = useRecoilValue(prevPageUrlState);

  return (
    <Header title="" url={prevPageUrl || "/gather"} isPrev={!!prevPageUrl}>
      <KakaoShareBtn
        title={title}
        subtitle={date.format("M월 DD일(dd)")}
        type="gather"
        url={WEB_URL + router.asPath}
        location={locationMain}
      />
    </Header>
  );
}

export default GatherHeader;
