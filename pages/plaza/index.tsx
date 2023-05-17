import Seo from "../../components/Seo";

import Header from "../../components/layouts/Header";
import Category from "../../pagesComponents/Plaza/main/Category";
import { useState } from "react";
import { category } from "../../types/plaza";
import { PlazaLayout } from "../../pagesComponents/Plaza/main/plazaStyles";

import styled from "styled-components";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPortal from "../../components/ModalPortal";
import WritePlazaModal from "../../modals/plaza/WritePlazaModal";
import { useRouter } from "next/router";
import { usePlazaDataQuery } from "../../hooks/plaza/queries";
import PlazaBlock from "../../pagesComponents/Plaza/main/PlazaBlock";

function Plaza() {
  const { data } = usePlazaDataQuery();
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
  background-color: var(--color-mint);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlazaMainContent = styled.main``;
export default Plaza;
