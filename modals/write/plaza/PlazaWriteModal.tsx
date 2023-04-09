import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSession } from "next-auth/react";

import { ModalLg } from "../../../styles/layout/modal";
import { PlazaContentVoteListModal } from "./PlazaContentVoteListModal";

import { usePlazaMutation } from "../../../hooks/plaza/mutations";

export default function PlazaWriteModal({ setIsModal }) {
  const [isVoteCategory, setIsVoteCategory] = useState(true);
  const [voteListArr, setVoteListArr] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onDeleteBtnClicked = (idx) => {
    const NewArr = voteListArr?.map((item) => {
      const voteListIdx = item.voteListIdx;
      let newIdx = idx;
      if (voteListIdx > idx) newIdx = voteListIdx - 1;
      else newIdx = voteListIdx;
      return { voteListIdx: newIdx, value: item.value };
    });
    NewArr.splice(idx - 1, 1);
    setVoteListArr(NewArr);
  };

  const { mutate: handlePlaza, isLoading: plazaLoading } = usePlazaMutation({
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  const onValid = async (data) => {
    const userInfo = {
      category: isVoteCategory ? "voteContents" : "suggestionContents",
      title: data.title,
      writer: isPublic ? session.user.name : "",
      deadline: isVoteCategory ? data.deadline : "",
      content: data.content,
      voteList: isVoteCategory ? voteListArr : [],
    };

    // await handlePlaza(userInfo);
  };

  return (
    <Layout>
      <Category>
        <Button
          onClick={() => setIsVoteCategory(true)}
          isSelected={Boolean(isVoteCategory)}
        >
          투표
        </Button>
        <Button
          onClick={() => setIsVoteCategory(false)}
          isSelected={!Boolean(isVoteCategory)}
        >
          건의
        </Button>
      </Category>
      <Form id="createPlaza" onSubmit={handleSubmit(onValid)}>
        <div>
          <>
            <span>제목: </span>
            <TitleInput {...register("title", { required: true })} />
          </>
        </div>
        <div>
          <span>작성자: </span>
          <IsPublicBtn
            isPublic={Boolean(isPublic)}
            onClick={() => setIsPublic(true)}
          >
            실명
          </IsPublicBtn>
          <IsPublicBtn
            isPublic={!Boolean(isPublic)}
            onClick={() => setIsPublic(false)}
          >
            익명
          </IsPublicBtn>
        </div>
        {isVoteCategory && (
          <div>
            <span>마감일: </span>
            <DeadlineInput
              {...register("deadline", {
                required: "필수입력",
                pattern: {
                  value: /^\d{2}-\d{2}$/,
                  message: "MM-DD 형식으로 작성해주세요",
                },
              })}
              placeholder="MM-DD"
            />
          </div>
        )}
        <div>
          <span>내용: </span>
          <Content {...register("content")} />
        </div>
        {isVoteCategory && (
          <VoteList>
            {voteListArr.map((item, idx) => (
              <div key={idx}>
                <span>
                  {item.voteListIdx}.&nbsp;&nbsp;{item.value}
                </span>
                <DeleteIcon onClick={() => onDeleteBtnClicked(idx + 1)}>
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </DeleteIcon>
              </div>
            ))}
            <PlazaContentVoteListModal
              voteListArr={voteListArr}
              setVoteListArr={setVoteListArr}
            />
          </VoteList>
        )}
      </Form>
      <button form="createPlaza">제출</button>
    </Layout>
  );
}

const IsPublicBtn = styled.button.attrs((props) => ({
  type: "button",
}))<{ isPublic: boolean }>`
  width: 50px;
  background-color: ${(props) => (props.isPublic ? "brown" : "lightGray")};
`;

const DeleteIcon = styled.button.attrs((props) => ({
  type: "button",
}))``;

const Layout = styled(ModalLg)`
  > button:last-child {
    width: 60px;
    height: 25px;
    background-color: lightGray;
    border-radius: 10px;
    align-self: flex-end;
  }
`;

const Category = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

const Button = styled.button<{ isSelected: boolean }>`
  width: 60px;
  height: 25px;
  border-radius: 10px;
  background-color: ${(props) => (props.isSelected ? "brown" : "lightGray")};
`;

const Form = styled.form`
  padding: 13px 5px;
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  > div {
    flex-basis: 30px;
    display: flex;
    margin-bottom: 3px;
    > span {
      display: inline-block;
      width: 60px;
    }
    > input {
      background-color: lightgray;
      width: auto;
      flex: 1;
    }
  }
  > div:last-child {
    display: block;
  }
`;

const TitleInput = styled.input``;

const Content = styled.textarea.attrs((props) => ({}))`
  width: 81%;
  height: 100px;
  background: lightgray;
`;

const DeadlineInput = styled.input``;

const VoteList = styled.div`
  flex: 1;
`;
