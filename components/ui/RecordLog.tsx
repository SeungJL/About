import { faCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { WIN_RECORD } from "../../storage/winRecord";

function RecordLog() {
  const temp = [
    {
      name: "이승주",
      date: "8/7",
      reason: "건의사항 보상",
      present: "베스킨라빈스",
    },
    {
      name: "이승주",
      date: "8/7",
      reason: "건의사항 보상",
      present: "베스킨라빈스",
    },
    {
      name: "이승주",
      date: "8/7",
      reason: "건의사항 보상",
      present: "베스킨라빈스",
    },
  ];
  return (
    <Layout>
      <Header>
        <span>날짜</span>
        <span>이름</span>
        <span>내용</span>
        <span>상품</span>
      </Header>
      <Content>
        {WIN_RECORD.slice()
          .reverse()
          .map((item, idx) => (
            <Item key={idx}>
              <span>{item.date}</span>
              <span>
                <span>{item.name}</span>
                <FontAwesomeIcon icon={faCircle} size="sm" />
              </span>
              <span>{item.reason}</span>
              <span>{item.present}</span>
            </Item>
          ))}
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  margin: var(--margin-sub) var(--margin-md);
`;

const Header = styled.header`
  display: flex;
  border-bottom: var(--border-main);
  font-size: 13px;
  padding: var(--padding-md) 0;
  font-weight: 600;
  color: var(--font-h2);
  > span {
    text-align: center;
  }
  > span:first-child {
    color: var(--font-h1);
    flex: 0.1;
  }
  > span:nth-child(2) {
    flex: 0.2;
    > span {
      margin-right: 1px;
    }
  }
  > span:nth-child(3) {
    flex: 0.35;
  }
  > span:last-child {
    flex: 0.35;
  }
`;

const Content = styled.div``;

const Item = styled(Header)`
  font-weight: 400;
  font-size: 12px;
  border-bottom: var(--border-sub);
`;

export default RecordLog;
