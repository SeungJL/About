import styled from "styled-components";

function RecordDetail() {
  const temp = [
    {
      date: "1일 토요일",
      data: [
        { name: "카탈로그", arrivedInfo: ["승주", "희오"] },
        { name: "탐앤탐스", arrivedInfo: ["승주", "희오"] },
      ],
    },
    {
      date: "2일 일요일",
      data: [
        { name: "카탈로그", arrivedInfo: ["승주", "희오"] },
        { name: "탐앤탐스", arrivedInfo: ["승주", "희오"] },
      ],
    },
  ];
  return (
    <Layout>
      {temp?.map((item, idx) => (
        <Block key={idx}>
          <Date>{item.date}</Date>
          <SpaceWrapper>
            {item.data.map((space, idx2) => (
              <div key={idx2}>
                <SpaceHeader>
                  <span>{space.name}</span>
                  <span>
                    참여자수: <span>6명</span>
                  </span>
                </SpaceHeader>
                <MemberWrapper>
                  <span>참여인원: </span>
                  {space.arrivedInfo.map((who, idx3) => (
                    <Member key={idx3}>{who}</Member>
                  ))}
                </MemberWrapper>
              </div>
            ))}
          </SpaceWrapper>
        </Block>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const Block = styled.div``;
const Date = styled.div`
  padding: 4px 14px;
  font-weight: 600;
  font-size: 12px;
  color: var(--font-h3);
  background-color: var(--font-h7);
`;

const SpaceWrapper = styled.div`
  padding: 14px;
  padding-bottom: 6px;
  font-size: 12px;
  color: var(--font-h2);
`;

const SpaceHeader = styled.header`
  display: flex;
  align-items: center;
  color: var(--font-h2);
  font-size: 13px;
  > span:first-child {
    font-weight: 600;
    margin-right: 16px;
  }
  > span:last-child {
    font-size: 11px;
    > span {
      color: var(--font-h1);
      font-weight: 600;
    }
  }
`;

const MemberWrapper = styled.div`
  display: flex;

  height: 36px;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--font-h6);
  > span {
    color: var(--font-h3);
    margin-right: 8px;
  }
`;

const Member = styled.div`
  margin-right: 4px;

  color: var(--font-h1);
`;

export default RecordDetail;
