import { useState, useRef } from "react";
import styled from "styled-components";
import { BaseModal } from "../../../styles/LayoutStyles";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { render } from "react-dom";
import React from "react";
import { VoteListInputItem } from "./VoteListInputItem";

export default function CreatePlazaContentModal({ setIsShowModal }) {
  const [isVoteCategory, setIsVoteCategory] = useState(true);
  const [voteListArr, setVoteListArr] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
      <Form>
        <div>
          <>
            <span>제목: </span>
            <TitleInput />
          </>
        </div>
        <div>
          <span>작성자: </span>
          <button type="button">실명</button>
          <button type="button">익명</button>
        </div>
        {isVoteCategory && (
          <div>
            <span>마감일: </span>
            <DeadlineInput />
          </div>
        )}
        <div>
          <span>내용: </span>
          <ContentInput />
        </div>
        {isVoteCategory && (
          <VoteList>
            {voteListArr.map((item, idx) => (
              <div key={idx}>
                {item.voteListIdx}.&nbsp;&nbsp;{item.value}
              </div>
            ))}
            <VoteListInputItem addVoteListItem={setVoteListArr} />
          </VoteList>
        )}
      </Form>
      <button>제출</button>
    </Layout>
  );
}

const Layout = styled(BaseModal)`
  width: 350px;
  height: 400px;
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

const ContentInput = styled.input`
  height: 100px;
`;

const DeadlineInput = styled.input``;

const VoteList = styled.div`
  flex: 1;
`;
