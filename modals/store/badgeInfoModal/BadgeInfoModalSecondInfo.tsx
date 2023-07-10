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
  padding: 12px 0 16px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  padding: 0 16px;

  border-bottom: 1px solid var(--font-h5);

  > div {
    width: 40%;
    text-align: center;
  }
`;

const Info = styled.span`
  display: inline-block;
  font-size: 12px;
  width: 200px;
  text-align: center;
`;

export default BadgeInfoModalSecondInfo;
