import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/layouts/Header";
import { STORE_GIFT } from "../../../storage/Store";

function StoreItem() {
  const router = useRouter();
  const itemId = Number(router.query?.id);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header title="기프티콘 추첨" url="/store" />
      <Layout>
        <Image
          width={200}
          height={200}
          alt="storeGiftDetail"
          unoptimized={true}
          src={`${STORE_GIFT[itemId]}`}
          onLoad={() => setIsLoading(false)}
        />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overview = styled.div``;

const Price = styled.div``;

const Nav = styled.nav``;

const Detail = styled.div``;

export default StoreItem;
