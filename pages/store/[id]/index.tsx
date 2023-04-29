import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/layouts/Header";
import StoreNavigation from "../../../pagesComponents/store/item/StoreNavigation";
import { STORE_GIFT } from "../../../storage/Store";

function StoreItem() {
  const router = useRouter();
  const itemId = Number(router.query?.id);

  const [isLoading, setIsLoading] = useState(false);

  const info = STORE_GIFT[itemId];

  return (
    <>
      <Header title="기프티콘 추첨" url="/store" />
      <Layout>
        <ImageWrapper>
          <Image
            width={200}
            height={200}
            alt="storeGiftDetail"
            unoptimized={true}
            src={`${info.image}`}
            onLoad={() => setIsLoading(false)}
          />
        </ImageWrapper>
        <Overview>
          <span>{info.name}</span>
          <span>{info.brand}</span>
        </Overview>
        {/* <Date>05.01 ~ 05.14</Date> */}
        <Price>{info.point} point</Price>
        <Nav>
          <span>현재 참여 인원은 7명 입니다.</span>
          <div>
            <Button size="lg">참여현황</Button>
            <Button size="lg">응모하기</Button>
          </div>
        </Nav>
        <Detail>5</Detail>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 14px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  margin-bottom: 12px;
  > span:first-child {
    font-size: 20px;
    font-weight: 800;
  }
  > span:last-child {
    color: var(--font-h3);
    font-weight: 600;
  }
`;

const Date = styled.div``;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;

  font-size: 18px;
  color: var(--color-mint);
`;

const Nav = styled.nav`
  margin-top: 16px;
  display: flex;
  font-weight: 600;
  flex-direction: column;
  > div {
    margin-top: 8px;
    display: flex;
    > button:first-child {
      color: var(--color-mint);
      margin-right: 8px;
    }
    > button:last-child {
      background-color: var(--color-mint);
      color: white;
    }
  }
`;

const Detail = styled.div``;

export default StoreItem;
