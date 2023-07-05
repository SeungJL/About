import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ImageSlider from "../../components/utils/ImageSlider";
import { usePointQuery } from "../../hooks/user/pointSystem/queries";
import { isPointLoadingState } from "../../recoil/loadingAtoms";
import { STORE_GIFT } from "../../storage/Store";

function PointPoint() {
  const router = useRouter();
  const isPointLoading = useRecoilValue(isPointLoadingState);
  const ImageContainer = STORE_GIFT?.map((item) => item.image);
  const { data } = usePointQuery();
  // const [isModal, setIsModal] = useState(false);
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
        <ImageSlider type="point" ImageContainer={ImageContainer} />
      </Store>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 14px;
  border-radius: var(--border-radius-main);
  background-color: white;

  box-shadow: var(--box-shadow);
`;
const Button = styled.button`
  width: 100%;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: 12px 8px;
  > div:first-child {
    font-size: 14px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: 6px;
    }
  }
`;

const Store = styled.div``;

export default PointPoint;
