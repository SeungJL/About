import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Category from "../../pagesComponents/gather/Category";
import { useState } from "react";
import ReviewItemHeader from "../../pagesComponents/Review/ReviewItemHeader";
import ImageSlider from "../../components/utils/ImageSlider";
import ReviewGatherConnection from "../../pagesComponents/Review/ReviewGatherConnection";
import ReviewContent from "../../pagesComponents/Review/ReviewContent";
import ReviewStatus from "../../pagesComponents/Review/ReviewStatus";

function Review() {
  const [category, setCateogry] = useState();
  const A = [1, 2];
  return (
    <>
      <Header title="모임 리뷰" />
      <Layout>
        <Category category={category} setCategory={setCateogry} />
        <Main>
          {A?.map((item) => (
            <Item key={item}>
              <ReviewItemHeader />
              <ImageSlider />
              <ReviewGatherConnection />
              <ReviewContent />
              <ReviewStatus />
            </Item>
          ))}
        </Main>
      </Layout>
    </>
  );
}

const Layout = styled.div``;

const Main = styled.main`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  margin-bottom: 60px;
`;

export default Review;
