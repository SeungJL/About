import styled from "styled-components";
import ImageSlider from "../../components/dataViews/imageSlider/ImageSlider";
import { IGroupStudy } from "../../types/page/groupStudy";

interface IGroupStudyMine {
  myStudies: IGroupStudy[];
}

function GroupStudyMine({ myStudies }: IGroupStudyMine) {
  return (
    <Layout>
      <Title>내 소모임</Title>
      {myStudies?.length ? (
        <ImageSlider imageContainer={myStudies} type="groupStudy" />
      ) : (
        <BlockLayout>가입중인 소모임이 없습니다.</BlockLayout>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  background-color: var(--font-h8);
  border-bottom: 6px solid var(--font-h56);
`;

const Title = styled.div`
  margin-bottom: var(--margin-main);
  background-color: white;
  padding: var(--padding-main) var(--padding-main);
  font-weight: 600;
  font-size: 18px;
`;
const BlockLayout = styled.div`
  height: 110px;

  margin-right: var(--margin-main);
  padding: var(--padding-sub) var(--padding-sub);
  padding-bottom: var(--padding-md);
  background-color: inherit;

  border-radius: var(--border-radius2);
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--margin-main);
  margin-bottom: var(--margin-main);
  font-size: 18px;
  color: var(--font-h3);
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: var(--border-sub);
  border-radius: var(--border-radius2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Name = styled.div`
  font-weight: 600;
  margin-top: var(--margin-md);
`;
export default GroupStudyMine;
