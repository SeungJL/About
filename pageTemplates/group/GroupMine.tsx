import styled from "styled-components";
import ImageTileSlider, {
  IImageTile,
} from "../../components2/organisms/sliders/ImageTileSlider";
import { IGroup } from "../../types/page/group";

interface IGroupMine {
  myGroups: IGroup[];
}

function GroupMine({ myGroups }: IGroupMine) {
  const imageTileArr: IImageTile[] = myGroups?.map((group) => ({
    imageUrl: group.image,
    text: group.title,
    url: `/group/${group.id}`,
  }));

  return (
    <Layout>
      {myGroups?.length ? (
        <ImageTileSlider
          imageTileArr={imageTileArr}
          slidesPerView={2.2}
          size="md"
          aspect={2}
        />
      ) : (
        <BlockLayout>가입중인 소모임이 없습니다.</BlockLayout>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  background-color: var(--gray-8);
  border-bottom: 6px solid var(--gray-7);
  padding: 16px;
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
  border: var(--border);
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
export default GroupMine;
