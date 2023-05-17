import Seo from "../../components/Seo";

import Header from "../../components/layouts/Header";

import { useState } from "react";

import { PlazaLayout } from "../../pagesComponents/Plaza/main/plazaStyles";

import styled from "styled-components";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPortal from "../../components/ModalPortal";
import WritePlazaModal from "../../modals/plaza/WritePlazaModal";
import { useRouter } from "next/router";
import { usePlazaDataQuery } from "../../hooks/plaza/queries";
import GatherBlock from "../../pagesComponents/gather/main/GatherBlock";
import Category from "../../pagesComponents/gather/main/Category";
import { GatherCategory } from "../../types/gather";

function Gather() {
  const { data } = usePlazaDataQuery();
  const [category, setCategory] = useState<GatherCategory>("전체");
  const filterData =
    category === "전체"
      ? data
      : data?.filter((item) => item.category === category);

  const reversedData = filterData?.slice().reverse();

  return (
    <>
      <Layout>
        <Seo title="Gather" />
        <Header title="모임" />
        <PlazaLayout>
          <Category category={category} setCategory={setCategory} />
          <PlazaMainContent>
            {reversedData?.map((data, idx) => (
              <GatherBlock key={idx} data={data} category={category} />
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
    <IconLayout onClick={() => router.push(`/gather/wrting/category`)}>
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
export default Gather;
