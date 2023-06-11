import Seo from "../../components/Seo";

import Header from "../../components/layouts/Header";

import { useState } from "react";

import { PlazaLayout } from "../../pagesComponents/Plaza/main/plazaStyles";

import { faPencil, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useGatherContentQuery } from "../../hooks/gather/queries";
import { usePlazaDataQuery } from "../../hooks/plaza/queries";
import Category from "../../pagesComponents/gather/Category";
import GatherBlock from "../../pagesComponents/gather/GatherBlock";
import { GatherCategory } from "../../types/gather";

function Gather() {
  const router = useRouter();
  const { data, isLoading } = usePlazaDataQuery();
  const [category, setCategory] = useState<GatherCategory>("전체");
  const [isNotice, setIsNotice] = useState(true);
  const filterData =
    category === "전체"
      ? data
      : data?.filter((item) => item.category === category);

  const { data: gatherContentArr } = useGatherContentQuery();
  console.log(gatherContentArr);

  const [a, setA] = useState(false);

  return (
    <>
      {!isLoading && (
        <Layout>
          <Seo title="Gather" />
          <Header title="모임">
            <Review onClick={() => router.push(`/review`)}>
              <span>모임 후기</span>
              <FontAwesomeIcon icon={faRightLong} />
            </Review>
          </Header>
          <PlazaLayout>
            <Category category={category} setCategory={setCategory} />
            <PlazaMainContent>
              {gatherContentArr?.map((data, idx) => (
                <GatherBlock key={idx} data={data} category={category} />
              ))}
            </PlazaMainContent>
          </PlazaLayout>
          <Navigation>
            <IconPencil />
          </Navigation>
        </Layout>
      )}
    </>
  );
}

const IconPencil = () => {
  const router = useRouter();
  return (
    <IconLayout onClick={() => router.push(`/gather/writing/category`)}>
      <FontAwesomeIcon icon={faPencil} color="white" size="lg" />
    </IconLayout>
  );
};

const Review = styled.span`
  font-weight: 600;
  font-size: 12px;
  > span:first-child {
    margin-right: 6px;
  }
`;

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
