import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import KakaoShareBtn from "../../../components/common/Icon/KakaoShareBtn";
import { WEB_URL } from "../../../constants/system";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
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
  const prevPageUrl = useRecoilValue(prevPageUrlState);

  const location = STUDY_SPACE_INFO.find((info) => info?.id === place?._id);
  const randomNum = Math.floor(Math.random() * STUDY_RANDOM_IMGAGE_LENGTH);

  const onClick = () => {
    router.push(prevPageUrl || "/about");
  };
 

  return (
    <Layout>
      <div onClick={onClick}>
        <button>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
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
  height: 52px;
  padding: 0 var(--padding-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-h2);
  font-size: 16px;
`;

const Title = styled.span`
  color: var(--font-h1);
  font-weight: 600;
  margin-left: var(--margin-main);
`;

export default StudySpaceHeader;
