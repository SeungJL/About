import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const BookLayout = styled.div`
  padding: 25px;
  > p {
    height: 200px;
    background-color: rgb(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  > footer {
    height: 80px;
    background-color: rgb(0, 255, 0, 0.1);
  }
`;

const BookHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const BookImg = styled.div`
  width: 160px;
  margin-right: 10px;
`;
const BookTitle = styled.span`
  font-size: 1.2em;
`;
const BookInfos = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 0.9em;
  > span {
    margin-bottom: 10px;
  }
`;

function Book() {
  const router = useRouter();
  const { authors, bookImageURL, genre, id, name, publish, rank } =
    router.query;
  return (
    <>
      <BookLayout>
        <BookHeader>
          <BookTitle>{name}</BookTitle>
          <Link href="/book">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </BookHeader>
        <BookInfos>
          <BookImg>
            {/* <img alt="bookImage" src={bookImageURL as string} /> */}
          </BookImg>
          <Info>
            <span>순위: {rank}</span>
            <span>작가:{authors}</span>
            <span>장르:{genre}</span>
            <span>출판일: {publish}</span>
          </Info>
        </BookInfos>
        <p>책 내용: ...</p>
        <footer>비슷한 책 추천</footer>
      </BookLayout>
    </>
  );
}
export default Book;
