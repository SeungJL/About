import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Image from "next/image";
import { useState } from "react";
import { FullScreen } from "../../styles/layout/modal";
import { MainLoading } from "../../components/ui/Loading";

const ITEM_WIDTH = 100;

function Store() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Header title="스토어" />
      <Layout>
        <Item>
          <Image
            width={ITEM_WIDTH}
            height={ITEM_WIDTH}
            alt="DWW"
            unoptimized={true}
            src="https://user-images.githubusercontent.com/84257439/234278482-4e399861-fe6b-43f1-ba69-325825c77f8f.png"
          />
          <Info>
            <Name>스타벅스 커피</Name>
            <Voter>응모 현황: ?</Voter>
            <Date>2023.05~</Date>
          </Info>
          <Point>20 point</Point>
        </Item>
        <Item>
          <Image
            width={ITEM_WIDTH}
            height={ITEM_WIDTH}
            alt="DWW"
            unoptimized={true}
            src="https://user-images.githubusercontent.com/84257439/234278529-6417eb2c-df4a-42c2-8dec-245f6c658f88.png"
          />
          <Info>
            <Name>베스킨라빈스</Name>
            <Voter>응모 현황: ?</Voter>
            <Date>2023.05~</Date>
          </Info>
          <Point>15 point</Point>
        </Item>
        <Item>
          <Image
            width={ITEM_WIDTH}
            height={ITEM_WIDTH}
            alt="DWW"
            unoptimized={true}
            src="https://user-images.githubusercontent.com/84257439/234278554-3ee16d3a-f03d-4cb1-b90f-0a027569ba52.png"
          />
          <Info>
            <Name>황금올리브 치킨 세트</Name>
            <Voter>응모 현황: ?</Voter>
            <Date>2023.05~</Date>
          </Info>
          <Point>100 point</Point>
        </Item>
        <Item>
          <Image
            width={ITEM_WIDTH}
            height={ITEM_WIDTH}
            alt="DWW"
            unoptimized={true}
            src="https://user-images.githubusercontent.com/84257439/234278584-672203a0-1370-4fb3-9eb2-9a943bf57528.png"
            onLoad={() => setIsLoading(false)}
          />
          <Info>
            <Name>설빙 초코 브라우니</Name>
            <Voter>응모 현황: ?</Voter>
            <Date>2023.05~</Date>
          </Info>
          <Point>40 point</Point>
        </Item>
      </Layout>
      <div style={{ marginTop: "40px", textAlign: "center", fontSize: "20px" }}>
        Coming Soon
      </div>
      {isLoading && (
        <>
          <Load>
            <MainLoading />
          </Load>
          <FullScreen />
        </>
      )}
    </>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 14px;
  gap: 8px;
`;

const Item = styled.div`
  height: 210px;
  background-color: var(--font-h7);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Name = styled.span`
  margin-top: 6px;
  font-weight: 600;
`;

const Voter = styled.span`
  font-size: 12px;
  color: var(--font-h2);
`;

const Date = styled.span`
  font-size: 12px;
  color: var(--font-h2);
`;

const Point = styled.span`
  color: var(--color-mint);
  font-size: 16px;
  margin-top: auto;
  margin-bottom: 12px;
`;

const Load = styled.div``;

export default Store;
