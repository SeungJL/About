import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Image from "next/image";
import { useState } from "react";
import { FullScreen } from "../../styles/layout/modal";
import { MainLoading } from "../../components/ui/Loading";
import { STORE_GIFT } from "../../storage/Store";
import { useRouter } from "next/router";

const ITEM_WIDTH = 100;

function Store() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  return (
    <>
      <Header title="스토어" />
      <Layout>
        {STORE_GIFT?.map((item, idx) => (
          <Item key={idx}>
            <Image
              width={ITEM_WIDTH}
              height={ITEM_WIDTH}
              alt="storeGift"
              unoptimized={true}
              src={item.image}
              onLoad={() => setIsLoading(false)}
              onClick={() => router.push(`/store/${idx}`)}
            />
            <Info>
              <Name>{item.name}</Name>
              <Voter>응모 현황: ?</Voter>
              <Date>2023.05~</Date>
            </Info>
            <Point>{item.point} point</Point>
          </Item>
        ))}
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
