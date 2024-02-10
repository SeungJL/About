import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUserRequestMutation } from "../../hooks/user/sub/request/mutations";
import VoteList from "../../pageTemplates/plaza/writing/VoteList";
import WritingCategory from "../../pageTemplates/plaza/writing/WritingCategory";
import WritingContent from "../../pageTemplates/plaza/writing/WritingContent";
import WritingHeader from "../../pageTemplates/plaza/writing/WritingHeader";
import WritingType from "../../pageTemplates/plaza/writing/WritingType";
import { IPlazaData } from "../../types/page/plaza";

function WritingPlaza() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const [isVote, setIsVote] = useState(true);

  const [voteList, setVoteList] = useState([]);
  const { data: session } = useSession();
  const { mutate: handlePlaza } = useUserRequestMutation({
    onSuccess() {
      router.push(`/plaza`);
    },
    onError: (err) => {},
  });

  const onSubmit = (data: IPlazaData) => {
    const writingData = {
      category: data.category,
      title: data.title,
      content: data.content,
      id: dayjs().format("hhmmss"),
      voteList,
      writer: session?.user.name,
      date: dayjs().format("YYYY-MM-DD"),
    };

    // handlePlaza(writingData);
  };
  return (
    <>
      <Layout
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <LayoutForm onSubmit={handleSubmit(onSubmit)} id="plazaWrite">
          <WritingHeader />
          <WritingCategory register={register} />
          <WritingType setIsVote={setIsVote} register={register} />
          <TitleInput
            {...register("title", { required: "제목을 입력하세요." })}
            placeholder="제목"
          />
          <WritingContent register={register} isVote={isVote} />
          {isVote && <VoteList setVoteList={setVoteList} />}
        </LayoutForm>
      </Layout>
    </>
  );
}

const Layout = styled(motion.div)``;

const LayoutForm = styled.form`
  padding: 0 16px;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-top: 16px;
  height: 44px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--font-h6);
  background-color: var(--font-h8);
  color: var(--font-h2);
  ::placeholder {
    font-size: 16px;
    font-weight: 600;
    color: var(--font-h4);
  }
`;

export default WritingPlaza;
