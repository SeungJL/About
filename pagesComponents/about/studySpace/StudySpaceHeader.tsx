import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import KakaoShareBtn from "../../../components/features/lib/KakaoShareBtn";
import { WEB_URL } from "../../../constants/system";
import { STUDY_SPACE_INFO } from "../../../storage/study";
import { IPlace } from "../../../types/study/studyDetail";

const STUDY_RANDOM_IMGAGE_LENGTH = 6;
interface IStudySpaceHeader {
  title: string;
  place: IPlace;
}

function StudySpaceHeader({ title, place }: IStudySpaceHeader) {
  const router = useRouter();
  const url = WEB_URL + router?.asPath;
  const location = STUDY_SPACE_INFO.find((info) => info?.id === place?._id);
  const randomNum = Math.floor(Math.random() * STUDY_RANDOM_IMGAGE_LENGTH);

  return (
    <Layout>
      <div onClick={() => router.push(`/about`)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <Title>{title}</Title>
      </div>
      <div>
        {location && (
          <KakaoShareBtn
            type="study"
            title="같이 스터디 해요~!"
            subtitle={place.fullname}
            location={location.location}
            img={`/studyRandom/study${randomNum + 1}.jpg`}
            url={url}
          />
        )}
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: var(--header-height);
  padding: 0 var(--padding-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-h2);
  padding-right: var(--padding-max);
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: var(--margin-main);
`;

export default StudySpaceHeader;
