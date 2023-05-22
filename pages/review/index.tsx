import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Category from "../../pagesComponents/gather/Category";
import { useState } from "react";

function Review() {
  const [category, setCateogry] = useState();
  return (
    <>
      <Header title="모임 리뷰" />
      <Layout>
        <Category category={category} setCategory={setCateogry} />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Review;
