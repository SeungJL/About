import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import ImageSlider from "../../components/utils/ImageSlider";
import { usePointQuery } from "../../hooks/user/pointSystem/queries";
import { STORE_GIFT } from "../../storage/Store";

function PointPoint() {
  const router = useRouter();

  const ImageContainer = STORE_GIFT.map((item) => item.image);
  const { data } = usePointQuery();

  return (
    <Layout>
      <Button onClick={() => router.push("/point/pointLog")}>
        <div>About 포인트</div>
        <div>
          <span>{data?.point || "0"}점</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Button>
      <Store onClick={() => router.push("/store")}>
        <Button>
          <div>포인트 스토어</div>
          <div>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Button>
        <Wrapper>
          <ImageSlider type="point" ImageContainer={ImageContainer} />
        </Wrapper>
      </Store>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--margin-max);
  padding: var(--padding-main);
  border-radius: var(--border-radius-main);
  background-color: white;
  box-shadow: var(--box-shadow);
`;
const Button = styled.button`
  width: 100%;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: var(--padding-sub) var(--padding-md);
  > div:first-child {
    font-size: 14px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: var(--margin-md);
    }
  }
`;

const Wrapper = styled.div`
  margin-top: var(--margin-sub);
`;

const Store = styled.div``;

export default PointPoint;
