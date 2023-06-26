import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import Header from "../../../components/layouts/Header";
import KakaoShareBtn from "../../../components/utils/KakaoShare";
import { WEB_URL } from "../../../constants/system";

interface IGatherHeader {
  title: string;
  date: Dayjs;
  locationMain: string;
}

function GatherHeader({ title, date, locationMain }: IGatherHeader) {
  const router = useRouter();

  return (
    <Header title="" url="/gather">
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
