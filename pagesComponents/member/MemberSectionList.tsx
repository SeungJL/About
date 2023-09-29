import styled from "styled-components";
import ImageSlider from "../../components/dataViews/chart/imageSlider/ImageSlider";
import { IUser } from "../../types/user/user";

interface IMemberMember {
  members: IUser[];
}

function MemberSectionList({ members }: IMemberMember) {
  return (
    <Layout>
      <ImageSlider type="member" imageContainer={members} />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MemberSectionList;
