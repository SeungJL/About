import { Badge } from "@chakra-ui/react";
import styled from "styled-components";

function BadgeInfoModalSecondInfo() {
  return (
    <Layout>
      <Item>
        <div>
          <Badge fontSize={12} variant="badgePink">
            딸기스무디
          </Badge>
        </div>
        <Info>이벤트 흭득 예정</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} colorScheme="facebook">
            라벤더
          </Badge>
        </div>
        <Info>이벤트 흭득 예정</Info>
      </Item>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.div`
  padding: 0 var(--padding-md);
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  border-bottom: var(--border-sub);

  > div {
    flex: 1;
    text-align: center;
  }
`;

const Info = styled.div`
  font-size: 12px;
`;

export default BadgeInfoModalSecondInfo;
