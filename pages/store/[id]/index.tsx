import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/loaders/MainLoading";
import Header from "../../../components/layout/Header";
import ModalPortal from "../../../components/modals/ModalPortal";
import { useStoreGiftQuery } from "../../../hooks/store/queries";
import StoreApplyGiftModal from "../../../modals/store/StoreApplyGiftModal";
import StoreGiftWinModal from "../../../modals/store/StoreGiftWinModal";
import StoreDetailCover from "../../../pagesComponents/store/detail/StoreDetailCover";
import StoreDetailDetails from "../../../pagesComponents/store/detail/StoreDetailDetails";
import StoreDetailNav from "../../../pagesComponents/store/detail/StoreDetailNav";
import StoreDetailOverview from "../../../pagesComponents/store/detail/StoreDetailOverview";
import { STORE_GIFT } from "../../../storage/Store";
import { IStoreGift } from "../../../types/page/store";

const dayjs = require("dayjs");
require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("ko");

function StoreItem() {
  const router = useRouter();
  const itemIdx = Number(router.query?.id);

  const [isApplyModal, setIsApplyModal] = useState(false);
  const [isWinModal, setIsWinModal] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  const info: IStoreGift = STORE_GIFT[itemIdx];

  const {
    data: applyInfos,
    isLoading,
    refetch,
  } = useStoreGiftQuery(info?.giftId, {
    enabled: !!info,
  });

  const applicants = applyInfos?.users;
  const totalApplyCnt = applicants?.reduce((acc, cur) => acc + cur.cnt, 0);
  const isCompleted = totalApplyCnt === info?.max;

  useEffect(() => {
    if (isRefetch) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetch]);

  return (
    <>
      <Header title="상세 정보" url="/store" />
      {!isLoading ? (
        <Layout>
          <StoreDetailCover image={info.image} isCompleted={isCompleted} />
          <StoreDetailOverview info={info} totalApplyCnt={totalApplyCnt} />
          <StoreDetailNav
            applyUsers={applyInfos.users}
            isCompleted={isCompleted}
            setIsApplyModal={setIsApplyModal}
            setIsWinModal={setIsWinModal}
          />
          <StoreDetailDetails winnerCnt={info.winner} max={info.max} />
        </Layout>
      ) : (
        <MainLoading />
      )}
      {isApplyModal && (
        <ModalPortal setIsModal={setIsApplyModal}>
          <StoreApplyGiftModal
            setIsModal={setIsApplyModal}
            giftInfo={info}
            setIsRefetch={setIsRefetch}
          />
        </ModalPortal>
      )}
      {isWinModal && (
        <ModalPortal setIsModal={setIsWinModal}>
          <StoreGiftWinModal
            setIsModal={setIsWinModal}
            applicants={applicants}
            win={info.winner}
          />
        </ModalPortal>
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
