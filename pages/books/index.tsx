import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchFamousBooks } from "../../api/api";

interface IBooks {
  bookImageURL: string;
  ranking: string;
  publication_year: string;
  class_nm: string;
  bookname: string;
  authors: string;
  isbn13: string;
}
const BooksLayout = styled.div`
  padding: 25px;
`;
const Header = styled.header`
  height: 70px;
  background-color: yellow;
`;
const Title = styled.div`
  display: flex;
  font-size: 2em;
  align-items: center;
`;
const HeaderInfo = styled.div``;
const Main = styled.main`
  flex-wrap: nowrap;
`;
const BookItem = styled.div`
  display: inline-block;
  margin: 10px 3px;
  padding: 0 5px;
  border: 1px solid black;
`;
const BookImage = styled.div`
  display: flex;
  justify-content: center;
`;
const BookTitle = styled.span`
  font-size: 0.8em;
`;

function Books() {
  const data: any = useQuery<any>("famousBooks", fetchFamousBooks);

  console.log(data.data);
  const booksObj: any = data.data?.response;
  console.log(booksObj);
  const books: IBooks[] = (booksObj as any)?.docs;
  console.log(booksObj);
  return (
    <BooksLayout>
      <Header>
        <Title>Book</Title>
        <HeaderInfo>헤더인포</HeaderInfo>
      </Header>
      <Main>
        {books?.map((book: any) => (
          <BookItem key={book.doc.isbn13}>
            <BookImage>
              <img src={book.doc.bookImageURL} width="120px" height="60px" />
            </BookImage>
            <BookTitle>{book.doc.bookname}</BookTitle>
            <br />
            <span>순위: {book.doc.ranking}</span>
          </BookItem>
        ))}
      </Main>
    </BooksLayout>
  );
}
export default Books;
