import { faCircle, faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import SectionHeader from "../../components/layout/atoms/SectionHeader";
import { WIN_RECORD } from "../../storage/winRecord";

function AboutWinRecord() {
  const router = useRouter();
  return (
    <Layout>
      <SectionHeader title="이벤트 당첨 현황" url="/winRecord" />
      <Content>
        <Header>
          <Date>날짜</Date>
          <Name>이름</Name>
          <Reason>내용</Reason>
          <Present>상품</Present>
        </Header>
        <Container>
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
        </Container>
        <IconWrapper>
          <FontAwesomeIcon icon={faEllipsis} size="lg" color="var(--font-h3)" />
        </IconWrapper>
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  background-color: var(--font-h8);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 var(--margin-main);
  margin-top: var(--margin-main);
  height: 328px;
  background-color: white;
  box-shadow: var(--box-shadow-b);
  border-radius: var(--border-radius-main);
  padding: var(--padding-md) 0;
`;

const Header = styled.header`
  padding: 0 var(--padding-main);
  display: flex;
  font-size: 13px;
  color: var(--font-h1);
  font-weight: 500;
  padding-bottom: var(--padding-md);
  border-bottom: var(--border-sub);
  > span:first-child {
    flex: 0.15;
  }
  > span:nth-child(2) {
    flex: 0.15;
  }
  > span:nth-child(3) {
    flex: 0.35;
  }
  > span:last-child {
    flex: 0.35;
  }
`;

const Container = styled.div`
  padding: 0 var(--padding-main);
`;

const Item = styled.div`
  border-bottom: 1px solid var(--font-h7);
  font-size: 11px;
  color: var(--font-h2);
  display: flex;
  padding: var(--padding-md) 0;
  > span:first-child {
    flex: 0.15;
  }
  > span:nth-child(2) {
    flex: 0.15;
  }
  > span:nth-child(3) {
    flex: 0.35;
  }
  > span:last-child {
    flex: 0.35;
  }
`;

const IconWrapper = styled.div`
  padding-top: var(--padding-min);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
