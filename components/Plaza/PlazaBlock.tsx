import { background } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IPlazaBlock, IPlazaData } from "../../models/plaza";
import { plazaCategoryState } from "../../recoil/plazaAtoms";

export default function PlazaBlock({ data }: IPlazaBlock) {
  const category = data.content;
  const title = data.title;
  const writer = data.writer;
  const content = data.content;
  const voteList = data?.voteList;
  return (
    <Layout>
      <Header>
        <Title>제목: {title}</Title>
        <Writer>작성자: {writer}</Writer>
      </Header>
      <Content>{content}</Content>
      <Main>
        {category !== "voteContents" ? (
          <form>
            {voteList?.map((item, idx) => (
              <InputItem key={idx}>
                <VoteInput item={item} />
                <label htmlFor={item}>{item}</label>
                <br />
              </InputItem>
            ))}{" "}
            <button>제출</button>
          </form>
        ) : (
          <>3</>
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
}))`
  background: lightyellow;
`;
