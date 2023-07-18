import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import ModalPortal from "../../components/ModalPortal";
import Seo from "../../components/Seo";
import { useUserRequestQuery } from "../../hooks/user/queries";
import NotCompletedModal2 from "../../modals/system/NotCompletedModal2";
import Category from "../../pagesComponents/plaza/main/Category";
import PlazaBlock from "../../pagesComponents/plaza/main/PlazaBlock";
import { PlazaLayout } from "../../pagesComponents/plaza/main/plazaStyles";
import { category } from "../../types/page/plaza";

function Plaza() {
  const { data } = useUserRequestQuery({
    onSuccess(test) {},
  });

  const [category, setCategory] = useState<category>("전체");
  // const filterData =
  //   category === "전체"
  //     ? data
  //     : data?.filter((item) => item.category === category);

  // const reversedData = filterData?.slice().reverse();
  const [isNotice, setIsNotice] = useState(true);
  const temp = [
    {
      category: "전체",
      title: "테스트",
      content: "테스트용 게시글입니다.",
      id: "34",
      writer: "이승주",
      date: "2023-05-29",
    },
    {
      category: "일상",
      title: "테스트",
      content: "테스트용 게시글입니다.",
      id: "35",
      writer: "이승주",
      date: "2023-05-30",
      voteList: [
        { voteListIdx: 0, value: "떡볶이" },
        { voteListIdx: 1, value: "마라탕" },
        { voteListIdx: 2, value: "연어" },
        { voteListIdx: 3, value: "대창" },
      ],
    },
  ];

  return (
    <>
      <Layout>
        <Seo title="Plaza" />
        <Header title="소통의 광장" />
        <PlazaLayout>
          <Category category={category} setCategory={setCategory} />
          <PlazaMainContent>
            {temp.map((data, idx) => (
              <PlazaBlock key={idx} data={data} category={category} />
            ))}
          </PlazaMainContent>
        </PlazaLayout>
        <Navigation>
          <IconPencil />
        </Navigation>
      </Layout>{" "}
      {isNotice && (
        <ModalPortal setIsModal={setIsNotice}>
          <NotCompletedModal2 setIsModal={setIsNotice} />
        </ModalPortal>
      )}
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
