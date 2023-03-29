import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

function WritingType({
  setIsVote,
  register,
}: {
  setIsVote: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FieldValues>;
}) {
  const onChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    if (value === "vote") setIsVote(true);
    else setIsVote(false);
  };
  return (
    <Layout>
      <Header>유형</Header>
      <Select name="type" onChange={onChange}>
        <option value="vote">투표</option>
        <option value="normal">일반 글</option>
      </Select>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Header = styled.header`
  font-weight: 600;
  color: var(--font-h2);
  margin-right: 16px;
`;

const Select = styled.select`
  width: 68px;
  border: 1px solid var(--font-h4);
  border-radius: 3px;
  color: var(--font-h3);
`;

export default WritingType;
