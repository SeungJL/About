import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchFamousBooks } from "../../hooks/vote/queries";
import Header from "../../components/Header";
import Seo from "../../components/Seo";

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
const BooksHeader = styled.header`
  height: 80px;
`;
const Title = styled.div`
  display: flex;
  font-size: 2.5em;
  align-items: center;
`;
const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const BookItem = styled.div`
  display: inline-block;
  margin: 10px 3px;
  padding: 0 5px;
  > div:first-child {
    text-align: center;
    margin-bottom: 2px;
    font-size: 0.8em;
  }
`;
const BookImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
`;
const BookTitle = styled.span`
  font-size: 0.8em;
  color: brown;
`;

function Books() {
  const data: any = useQuery<any>("famousBooks", fetchFamousBooks);

  const booksObj: any = data.data?.response;
  const isLoading = data.isLoading;
  const books: IBooks[] = (booksObj as any)?.docs.slice(0, 30);

  return (
    <>
      <Header />
      <Seo title="Books" />
      <BooksLayout>
        <BooksHeader>
          <Title>Book</Title>
          <HeaderInfo>
            <span>20대 도서 인기 순위</span>
            <span>기준: 23년 2월</span>
          </HeaderInfo>
        </BooksHeader>
        <Main>
          {isLoading
            ? "Loading..."
            : books?.map((book: any) => {
                let info = book.doc;
                return (
                  <Link
                    href={{
                      pathname: `/book/${info.isbn13}`,
                      query: {
                        authors: info.authors,
                        bookImageURL: info.bookImageURL,
                        name: info.bookname,
                        genre: info.class_nm,
                        publish: info.publication_year,
                        rank: info.ranking,
                      },
                    }}
                    key={info.isbn13}
                    as={`/book/${info.isbn13}`}
                  >
                    <BookItem>
                      <div>{info.ranking}</div>
                      <BookImage>
                        <img
                          alt={info.bookname}
                          src={info.bookImageURL}
                          width="130px"
                          height="60px"
                        />
                      </BookImage>
                      <BookTitle>{info.bookname}</BookTitle>
                      <br />
                    </BookItem>
                  </Link>
                );
              })}
        </Main>
      </BooksLayout>
    </>
  );
}
export default Books;
