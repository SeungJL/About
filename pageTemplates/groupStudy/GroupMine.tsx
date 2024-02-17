import styled from "styled-components";
import ImageSlider from "../../components/dataViews/imageSlider/ImageSlider";
import { IGroupStudy } from "../../types/page/groupStudy";

interface IGroupStudyMine {
  myStudies: IGroupStudy[];
}

function GroupStudyMine({ myStudies }: IGroupStudyMine) {
  return (
    <Layout>
      {myStudies?.length ? (
        <ImageSlider imageContainer={myStudies} type="groupStudy" />
      ) : (
        <BlockLayout>가입중인 소모임이 없습니다.</BlockLayout>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  background-color: var(--gray-8);
  border-bottom: 6px solid var(--gray-7);
  padding-top: var(--gap-4);
`;

const Title = styled.div`
  margin-bottom: var(--gap-4);
  background-color: white;
  padding: var(--gap-4) var(--gap-4);
  font-weight: 600;
  font-size: 18px;
`;
const BlockLayout = styled.div`
  height: 110px;

  margin-right: var(--gap-4);
  padding: var(--gap-3) var(--gap-3);
  padding-bottom: var(--gap-2);
  background-color: inherit;

  border-radius: var(--rounded);
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--gap-4);
  margin-bottom: var(--gap-4);
  font-size: 18px;
  color: var(--gray-3);
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: var(--border-light);
  border-radius: var(--rounded);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Name = styled.div`
  font-weight: 600;
  margin-top: var(--gap-2);
`;
export default GroupStudyMine;
