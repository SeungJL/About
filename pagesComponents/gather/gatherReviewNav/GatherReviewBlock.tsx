import styled from "styled-components";

interface IGatherReviewBlock {
  image: string;
  title: string;
}
function GatherReviewBlock({ image, title }: IGatherReviewBlock) {
  return <Layout></Layout>;
}

const Layout = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid black;
`;

export default GatherReviewBlock;
