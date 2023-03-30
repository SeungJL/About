import Seo from "../../components/common/Seo";

import Header from "../../components/common/Header";
import Category from "../../pagesComponents/Plaza/main/Category";
import { useState } from "react";
import { category } from "../../types/plaza";
import { PlazaLayout } from "../../pagesComponents/Plaza/main/plazaStyles";
import PlazaBlock from "../../pagesComponents/Plaza/main/PlazaBlock";
import styled from "styled-components";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPortal from "../../components/ModalPortal";
import PlazaWriteModal from "../../modals/write/plaza/PlazaWriteModal";
import { useRouter } from "next/router";
import { usePlazaQuery } from "../../hooks/plaza/queries";

function Plaza() {
  const { data } = usePlazaQuery();
  const [category, setCategory] = useState<category>("전체");
  const filterData =
    category === "전체"
      ? data
      : data?.filter((item) => item.category === category);

  const reversedData = filterData?.slice().reverse();

  return (
    <>
      <Layout>
        <Seo title="Plaza" />
        <Header title="소통의 광장" />
        <PlazaLayout>
          <Category category={category} setCategory={setCategory} />
          <PlazaMainContent>
            {reversedData?.map((data, idx) => (
              <PlazaBlock key={idx} data={data} category={category} />
            ))}
          </PlazaMainContent>
        </PlazaLayout>
        <Navigation>
          <IconPencil />
        </Navigation>
      </Layout>
    </>
  );
}

const IconPencil = () => {
  const router = useRouter();
  return (
    <IconLayout onClick={() => router.push(`/plaza/writing`)}>
      <FontAwesomeIcon icon={faPencil} color="white" size="lg" />
    </IconLayout>
  );
};

const Layout = styled.div`
  position: relative;
`;

const Navigation = styled.nav`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const IconLayout = styled.div`
  background-color: var(--color-red);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlazaMainContent = styled.main``;
export default Plaza;
