import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ImageSlider from "../../components/utils/ImageSlider";
import { STORE_GIFT } from "../../storage/Store";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPortal from "../../components/ModalPortal";
import InspectionModal from "../../modals/system/InspectionModal";
import { usePointQuery } from "../../hooks/user/pointSystem/queries";

function PointPoint() {
  const router = useRouter();
  const ImageContainer = STORE_GIFT?.map((item) => item.image);
  const { data } = usePointQuery();
  // const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Layout>
        <Button onClick={() => router.push("/point/pointlog")}>
          <div>About 포인트</div>
          <div>
            <span>{data?.point}점</span>
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
      {/* {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <InspectionModal setIsModal={setIsModal} />
        </ModalPortal>
      )} */}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  border-radius: var(--border-radius2);
  background-color: white;
  box-shadow: var(--box-shadow);
  margin: 14px;
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
