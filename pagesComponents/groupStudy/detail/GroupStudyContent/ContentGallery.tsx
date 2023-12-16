import dayjs from "dayjs";
import styled from "styled-components";
import { dayjsToFormat } from "../../../../helpers/dateHelpers";

function ContentGallery() {
  return (
    <Layout>
      <Month>
        {dayjsToFormat(dayjs(), "M월 D일")} ~{" "}
        {dayjsToFormat(dayjs(), "M월 D일")}
      </Month>
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main);
`;

const Month = styled.div``;

const Container = styled.div``;

export default ContentGallery;
