import { Badge } from "@chakra-ui/react";
import styled from "styled-components";

function BadgeInfoModalSecondInfo() {
  return (
    <Layout>
      <Item>
        <div>
          <Badge fontSize={12} colorScheme="badgePink">
            딸기스무디
          </Badge>
        </div>
        <Info>출석보상 획득 가능</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} colorScheme="facebook">
            라벤더
          </Badge>
        </div>
        <Info>출석보상 획득 가능</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} colorScheme="badgeMint">
            민트초코
          </Badge>
        </div>
        <Info>비공개</Info>
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
  padding: 12px 16px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  border-bottom: var(--border-light);

  > div {
    flex: 1;
    text-align: center;
  }
`;

const Info = styled.div`
  font-size: 12px;
`;

export default BadgeInfoModalSecondInfo;
