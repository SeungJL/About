import { background } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IPlazaBlock, IPlazaData } from "../../models/plaza";
import { plazaCategoryState } from "../../recoil/plazaAtoms";

export default function PlazaBlock({ data }: IPlazaBlock) {
  const id = data.id;
  return (
    <Layout>
      <Header>
        <Title>제목: {data.title}</Title>
        <Writer>작성자: {data.writer}</Writer>
      </Header>
      <Content>{data.content}</Content>
      <Main>
        {data.category === "voteContents" ? (
          <>
            <form id={id}>
              {data.voteList?.map((item, idx) => (
                <InputItem key={idx}>
                  <VoteInput item={item} name={id} />
                  <label htmlFor={item}>{item}</label>
                  <br />
                </InputItem>
              ))}{" "}
            </form>
            <VoteFooter>
              <span>마감일:{data.deadline} </span>
              <button form={id}>제출</button>
            </VoteFooter>
          </>
        ) : (
          <>{data.suggestContent}</>
        )}
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  background-color: lightgray;
  border-radius: 20px;
  margin-bottom: 30px;
  padding: 15px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  height: 30px;
  display: flex;
  justify-content: space-between;
  flex: 1;
  border-bottom: 1px solid rgb(0, 0, 0, 0.5);
`;

const Title = styled.span`
  font-size: 0.9em;
`;
const Writer = styled.span`
  display: inline-block;
  padding-top: 7px;
  font-size: 0.8em;
`;

const Content = styled.div`
  padding: 8px 0;
  color: rgb(0, 0, 0, 0.6);
  font-size: 0.9em;
`;
const Main = styled.main`
  height: 60px;
  flex: 3;
`;

const InputItem = styled.div``;
const VoteInput = styled.input.attrs<{ item: string }>((props) => ({
  type: "radio",
  id: props.item,
  value: props.item,
}))<{ item: string }>`
  background: lightyellow;
`;

const VoteFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  > span {
    display: inline-block;
    align-self: flex-end;
    margin-right: 15px;
    padding-bottom: 3px;
    font-size: 0.8em;
  }
  > button {
    width: 60px;
    background-color: pink;
    border-radius: 10px;
  }
`;
