import styled from "styled-components";

function ContentGallery() {
  return (
    <Layout>
      <Message>게시된 앨범이 없습니다.</Message>
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main);
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  font-size: 16px;
  color: var(--font-h3);
`;

export default ContentGallery;
