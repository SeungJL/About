import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import KakaoShareBtn from "../../../components/utils/KakaoShare";
import { WEB_URL } from "../../../constants/system";
import { STUDY_SPACE_INFO } from "../../../storage/study";
import { IPlace } from "../../../types/studyDetails";

const IMAGE_LIST = [1, 2, 3, 4, 5];

function StudySpaceHeader({ title, place }: { title: string; place: IPlace }) {
  const router = useRouter();

  const url = WEB_URL + router?.asPath;
  const location = STUDY_SPACE_INFO?.find((info) => info?.id === place?._id);

  const randomNum = Math.floor(Math.random() * IMAGE_LIST.length);

  return (
    <Layout>
      <div onClick={() => router.push(`/about`)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <Title>{title}</Title>
      </div>
      <div className="shareBtn">
        {location && (
          <KakaoShareBtn
            type="study"
            title="같이 스터디 해요~!"
            subtitle={place?.fullname}
            location={location?.location}
            img={`/studyRandom/study${randomNum + 1}.jpg`}
            url={url}
          />
        )}
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-h2);
  padding-right: 20px;
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

export default StudySpaceHeader;
