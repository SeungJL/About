import Image from "next/image";
import styled from "styled-components";
import Header from "../../components/common/Header";

function EventPage() {
  return (
    <>
      <Header title="이벤트" />
      <Layout>
        <Wrapper>
          <Title>리모델링 기념 이벤트 !</Title>
          <EventHeader>
            <div>
              <span>기간</span>
              <div>3월 27일 ~ 4월 30일</div>
            </div>
            <div>
              <span>상품</span>
              <div>
                황금올리브치킨 세트, 스타벅스 10000원 기프티콘, 베스킨라빈스
                기프티콘, CU 상품권
              </div>
            </div>
          </EventHeader>
        </Wrapper>
        <Content>
          <P>
            자세한 내용은 아래의 이벤트 포스트 확인 ! <br />
            <b>많관부. 많참부 !</b>
          </P>
          <ImageWrapper>
            <Image
              height={468}
              width={375}
              src={`/event/event1.png`}
              alt="event1"
            />
          </ImageWrapper>
        </Content>
      </Layout>
    </>
  );
}

const Layout = styled.div``;
const Wrapper = styled.div`
  padding: 16px;
  border-bottom: 6px solid var(--font-h6);
`;
const Title = styled.span`
  color: var(--font-h1);
  font-size: 18px;
  font-weight: 600;
`;
const EventHeader = styled.header`
  margin-top: 18px;
  font-size: 15px;

  > div {
    display: flex;
    margin-bottom: 4px;
    > span {
      margin-right: 16px;
      color: var(--font-h3);
    }
    > div {
      width: 80%;
    }
  }
`;
const Content = styled.div`
  font-size: 15px;
`;
const ImageWrapper = styled.div`
  margin: auto;
`;
const P = styled.p`
  padding: 16px;
  padding-top: 20px;
  margin-bottom: 12px;
`;

export default EventPage;
