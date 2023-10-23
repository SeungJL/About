import { faCircle, faEllipsis } from "@fortawesome/pro-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import AboutMoreInfoBtn from "../../../components/pages/AboutMoreInfoBtn";
import { WIN_RECORD } from "../../../storage/winRecord";

function AboutWinRecord() {
  const router = useRouter();
  return (
    <Layout>
      <Title>이벤트 당첨 기록</Title>
      <Content>
        <Header>
          <Date>날짜</Date>
          <Name>이름</Name>
          <Reason>내용</Reason>
          <Present>상품</Present>
        </Header>
        {WIN_RECORD.slice()
          .reverse()
          .slice(0, 8)
          .map((item, idx) => (
            <Item key={idx}>
              <Date>{item.date}</Date>
              <Name>
                <span>{item.name}</span>
                <FontAwesomeIcon icon={faCircle} size="sm" />
              </Name>
              <Reason>{item.reason}</Reason>
              <Present>{item.present}</Present>
            </Item>
          ))}
        <IconWrapper>
          <FontAwesomeIcon icon={faEllipsis} />
        </IconWrapper>
      </Content>
      <AboutMoreInfoBtn url="/winRecord" />
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: 32px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  margin-top: var(--margin-main);
  height: 320px;
  background-color: var(--font-h56);
  border-radius: var(--border-radius-main);
  padding: var(--padding-sub);
`;

const Item = styled.div`
  border-bottom: 1px solid var(--font-h5);
  font-size: 11px;
  color: var(--font-h2);
  display: flex;
  padding: var(--padding-md) 0;

  > span {
    text-align: center;
  }
`;

const Header = styled.header`
  display: flex;
  font-size: 12px;
  color: var(--font-h2);
  font-weight: 600;
  margin-bottom: var(--margin-min);
  > span {
    text-align: center;
  }
`;

const IconWrapper = styled.div`
  text-align: center;
`;

const Name = styled.span`
  flex: 0.15;
  > span:first-child {
    margin-right: 1px;
  }
`;

const Date = styled.span`
  flex: 0.15;
`;

const Reason = styled.span`
  flex: 0.35;
`;

const Present = styled.span`
  flex: 0.35;
`;

export default AboutWinRecord;
