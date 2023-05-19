import styled from "styled-components";
import BottomNav from "../../../components/layouts/BottomNav";
import ProgressLayout from "../../../components/layouts/ProgressLayout";
import RegisterLayout from "../../../pagesComponents/Register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/Register/RegisterOverview";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../../../components/layouts/Header";
function WritingContent() {
  const router = useRouter();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onClickNext = () => {
    // if (!title || !content) {
    //   toast({
    //     title: "진행 불가",
    //     description: `주제를 선택해 주세요!`,
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   return;
    // }

    // setTitleContent((old) => ({ ...old, category: selectCategory }));
    router.push(`/gather/writing/date`);
  };
  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressLayout value={50} />
      <Header title="" url="/gather/writing/category" />
      <RegisterLayout>
        <RegisterOverview>
          <span>내용을 입력해 주세요.</span>
        </RegisterOverview>
        <Container>
          <TitleInput placeholder="제목" />

          <Content placeholder="소개글을 입력해 주세요" />
        </Container>
        <Message>소개가 자세할수록 참여율이 높아져요!</Message>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </Layout>
  );
}

const Layout = styled(motion.div)``;

const Container = styled.div``;

const TitleInput = styled.input`
  margin-top: 20px;
  border-bottom: 2px solid var(--font-h1);
  width: 100%;
  height: 40px;
  background-color: inherit;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  ::placeholder {
    color: var(--font-h4);
  }
`;

const Content = styled.textarea`
  margin-top: 40px;
  border: 1.5px solid var(--font-h5);
  border-radius: var(--border-radius);
  height: 200px;
  width: 100%;
  padding: 8px 10px;
  font-size: 12px;
  :focus {
    outline: none;
    border: 1.5px solid var(--font-h2);
  }
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 13px;
  color: var(--font-h4);
`;

export default WritingContent;
