import { Badge } from "@chakra-ui/react";
import styled from "styled-components";

function BadgeInfoModalFirstInfo() {
  return (
    <Layout>
      <Item>
        <div>
          <Badge fontSize={12} variant="subtle">
            아메리카노
          </Badge>
        </div>
        <Info>0점 ~ 29점</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} variant="subtle" colorScheme="orange">
            라떼
          </Badge>
        </div>
        <Info>30점 ~ 69점 </Info>
      </Item>
      <Item>
        <div>
          <Badge colorScheme="green" fontSize={12}>
            마키아또
          </Badge>
        </div>
        <Info>70점 ~ 119점</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} variant="subtle" colorScheme="twitter">
            콜드브루
          </Badge>
        </div>
        <Info>120점 ~ 179점</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} variant="subtle" colorScheme="teal">
            아인슈페너
          </Badge>
        </div>
        <Info>180점 ~ 249점</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} variant="subtle" colorScheme="yellow">
            모카
          </Badge>
        </div>
        <Info>250점 ~ 329점</Info>
      </Item>
      <Item>
        <div>
          <Badge fontSize={12} variant="subtle" colorScheme="purple">
            에스프레소
          </Badge>
        </div>
        <Info>330점 +</Info>
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

export default BadgeInfoModalFirstInfo;
