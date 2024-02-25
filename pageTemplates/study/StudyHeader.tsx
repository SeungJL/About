import { useRouter } from "next/router";
import KakaoShareBtn from "../../components/common/Icon/KakaoShareBtn";

import Header from "../../components/layout/Header";
import { WEB_URL } from "../../constants/system";
import { IPlace } from "../../types2/studyTypes/studyVoteTypes";

const STUDY_RANDOM_IMGAGE_LENGTH = 6;
interface IStudyHeader {
  place: IPlace;
}

function StudyHeader({ place }: IStudyHeader) {
  const router = useRouter();

  const url = WEB_URL + router?.asPath;

  return (
    <Header title={place.brand} url="/home">
      {place?.brand !== "자유 신청" && (
        <KakaoShareBtn
          type="study"
          title="같이 스터디 해요~!"
          subtitle={place.fullname}
          location={place.locationDetail}
          img={place.coverImage}
          url={url}
        />
      )}
    </Header>
  );
}

export default StudyHeader;
