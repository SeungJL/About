import styled from "styled-components";
import ImageSlider from "../../components/utils/ImageSlider";
import { IUser } from "../../types/user/user";

interface IMemberMember {
  users: IUser[];
}

function MemberSectionList({ users }: IMemberMember) {
  return (
    <Layout>
      <ImageSlider type="member" ImageContainer={users} />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
`;

export default MemberSectionList;
