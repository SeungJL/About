import { faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import { MainLoading } from "../../components/common/loaders/MainLoading";
import Header from "../../components/layout/Header";
import ModalPortal from "../../components/modals/ModalPortal";
import { StoreGiftImage } from "../../components/utils/DesignAdjustment";
import { GIFT_ID_INFO } from "../../constants/contentsValue/store";
import { useStoreGiftEntryQuery } from "../../hooks/store/queries";
import StoreRuleModal from "../../modals/store/StoreRuleModal";
import { STORE_GIFT } from "../../storage/Store";
import { FullScreen } from "../../styles/layout/modal";

function Store() {
  const router = useRouter();
  const [applyNum, setApplyNum] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const { isLoading } = useStoreGiftEntryQuery({
    onSuccess(data) {
      const giftArr = new Array(6).fill(0);
      data.users.forEach((who) => {
        const giftIdx = +who.giftId - GIFT_ID_INFO.startId;
        if (giftIdx >= 0 && giftIdx <= GIFT_ID_INFO.giftCnt)
          giftArr[giftIdx] += who.cnt;
      });
      setApplyNum(giftArr);
    },
  });

  return (
    <>
      <Header title="포인트 스토어" url="/point">
        <RuleIcon setIsModal={setIsModal} />
      </Header>
      <Layout>
        {STORE_GIFT.map((item, idx) => {
          return (
            <Item key={idx} onClick={() => router.push(`/store/${idx}`)}>
              <Status>
                <Trophy>
                  {new Array(item.winner).fill(0).map((_, idx) => (
                    <div key={idx}>
                      <FontAwesomeIcon
                        icon={faTrophy}
                        color="var(--color-mint)"
                      />
                    </div>
                  ))}
                </Trophy>
                <ApplyCnt>
                  <span>{applyNum[idx]}</span>
                  <span>/{item.max}</span>
                </ApplyCnt>
              </Status>
              <ImageWrapper>
                <StoreGiftImage imageSrc={item.image} giftId={item.giftId} />
                {item.max === applyNum[idx] && <Circle>추첨 완료</Circle>}
              </ImageWrapper>
              <Info>
                <Name>{item.name}</Name>
                <Point>{item.point} point</Point>
              </Info>
              {item?.max === applyNum[idx] && <CompletedRapple />}
            </Item>
          );
        })}
      </Layout>
      {isLoading && (
        <>
          <MainLoading />
          <FullScreen />
        </>
      )}
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <StoreRuleModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin: 0 var(--margin-main);
  padding: var(--padding-main) 0;
  gap: var(--margin-sub);
`;

const Item = styled.div`
  position: relative;
  height: 196px;
  padding: var(--padding-md);
  background-color: var(--font-h7);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius-sub);
`;

const Status = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  font-size: 13px;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  > div {
    margin-left: var(--padding-min);
  }
`;

const ApplyCnt = styled.div`
  align-self: flex-end;
  color: var(--font-h3);
`;

const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  margin-top: -16px;
`;

const Info = styled.div`
  margin-top: -12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Point = styled.span`
  margin-top: var(--margin-min);
  color: var(--color-mint);
  font-size: 16px;
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 2px solid var(--font-h1);
  display: flex;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const CompletedRapple = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--font-h56);
  opacity: 0.5;
`;

export default Store;
