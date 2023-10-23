import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useFailToast } from "../../hooks/CustomToast";
import { usePromotionQuery } from "../../hooks/promotion/queries";
import PromotionAllCoolTimeModal from "../../modals/promotion/PromotionAllCoolTimeModal";
import PromotionMyCoolTimeModal from "../../modals/promotion/PromotionMyCoolTimeModal";

function PromotionDetail() {
  const failToast = useFailToast();
  const { data: session } = useSession();
  const [isMyModal, setIsMyModal] = useState(false);
  const [isAllModal, setIsAllModal] = useState(false);

  const { data: promotionData } = usePromotionQuery();

  const myApply = promotionData?.find((item) => item.uid === session?.uid);

  const onClick = () => {
    if (!myApply) {
      failToast("free", "홍보 참여 기록이 있어야 확인할 수 있어요!");
      return;
    }
    setIsMyModal(true);
  };

  return (
    <>
      <Layout>
        <Button
          w="50%"
          mr="var(--margin-md)"
          onClick={() => setIsAllModal(true)}
          color="var(--font-h2)"
          borderRadius="var(--border-radius-sub)"
          border="1px solid var(--font-h6)"
        >
          전체 현황
        </Button>
        <Button
          w="50%"
          onClick={onClick}
          borderRadius="var(--border-radius-sub)"
          color="var(--font-h2)"
          border="1px solid var(--font-h6)"
        >
          지난 당첨 기록
        </Button>
      </Layout>
      {isMyModal && (
        <PromotionMyCoolTimeModal myApply={myApply} setIsModal={setIsMyModal} />
      )}
      {isAllModal && (
        <PromotionAllCoolTimeModal
          setIsModal={setIsAllModal}
          promotionData={promotionData}
        />
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  margin: 0 40px;
  margin-top: 32px;
  margin-bottom: var(--margin-main);
`;

export default PromotionDetail;
