import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
import StoreApplyGiftModal from "../../../modals/store/StoreApplyGiftModal";
import StoreGiftWinModal from "../../../modals/store/StoreGiftWinModal";
import StoreDetailCover from "../../../pagesComponents/store/detail/StoreDetailCover";
import StoreDetailDetails from "../../../pagesComponents/store/detail/StoreDetailDetails";
import StoreDetailNav from "../../../pagesComponents/store/detail/StoreDetailNav";
import StoreDetailOverview from "../../../pagesComponents/store/detail/StoreDetailOverview";
import { transferStoreGiftDataState } from "../../../recoil/transferDataAtoms";

const dayjs = require("dayjs");
require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("ko");

function StoreItem() {
  const [isApplyModal, setIsApplyModal] = useState(false);
  const [isWinModal, setIsWinModal] = useState(false);

  const storeGiftData = useRecoilValue(transferStoreGiftDataState);
  const giftInfo = storeGiftData?.data;
  const isActive = storeGiftData?.isActive;
  console.log(isActive);
  return (
    <>
      <Header title="상세 정보" url="/store" />
      {storeGiftData && (
        <Layout>
          <StoreDetailCover image={giftInfo.image} isCompleted={!isActive} />
          <StoreDetailOverview
            info={giftInfo}
            totalApplyCnt={giftInfo.totalCnt}
            isActive={isActive}
          />
          <StoreDetailNav
            applyUsers={giftInfo.users}
            isCompleted={!isActive}
            setIsApplyModal={setIsApplyModal}
            setIsWinModal={setIsWinModal}
          />
          <StoreDetailDetails winnerCnt={giftInfo.winner} max={giftInfo.max} />
        </Layout>
      )}
      {isApplyModal && (
        <StoreApplyGiftModal setIsModal={setIsApplyModal} giftInfo={giftInfo} />
      )}
      {isWinModal && (
        <StoreGiftWinModal
          setIsModal={setIsWinModal}
          applicants={giftInfo}
          winCnt={giftInfo.winner}
        />
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 var(--margin-main);
`;

export default StoreItem;
