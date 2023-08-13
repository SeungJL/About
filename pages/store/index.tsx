import { faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import { MainLoading } from "../../components/common/MainLoading";
import ModalPortal from "../../components/common/ModalPortal";
import Header from "../../components/layout/Header";
import { StoreGiftImage } from "../../components/utils/DesignAdjustment";
import { useStoreAllQuery } from "../../hooks/store/queries";
import StoreRuleModal from "../../modals/store/StoreRuleModal";
import { STORE_GIFT } from "../../storage/Store";
import { FullScreen } from "../../styles/layout/modal";

const ITEM_WIDTH = 120;

function Store() {
  const [applyNum, setApplyNum] = useState([]);
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);

  const { isLoading } = useStoreAllQuery({
    onSuccess(data) {
      const temp = new Array(6).fill(0);
      data?.users.forEach((who) => {
        const giftIdx = Number(who?.giftId);
        if (giftIdx <= 6 || who?.uid === "7" || who?.cnt < 1) return;
        temp[giftIdx - 1] += who?.cnt;
        setApplyNum(temp);
      });
    },
  });

  return (
    <>
      <Header title="포인트 추첨" url="point">
        <RuleIcon setIsModal={setIsModal} />
      </Header>
      <Layout>
        {STORE_GIFT?.map((item, idx) => {
          const winTemp = [];
          for (let i = 0; i < item?.winner; i++) winTemp.push(i);
          return (
            <Item key={idx} onClick={() => router.push(`/store/${idx}`)}>
              <Status>
                <div>
                  {winTemp?.map((win) => (
                    <div key={win} style={{ marginLeft: "auto" }}>
                      <FontAwesomeIcon
                        icon={faTrophy}
                        color="var(--color-mint)"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <span>{applyNum[idx]}</span>
                  <span>/{item?.max}</span>
                </div>
              </Status>
              <ImageWrapper>
                <StoreGiftImage imageSrc={item.image} giftId={item.giftId} />
                {item?.max === applyNum[idx] && <Circle>추첨 완료</Circle>}
              </ImageWrapper>
              <Info>
                <Name>{item.name}</Name>

                <Point>{item.point} point</Point>
              </Info>
              {item?.max === applyNum[idx] && (
                <CompletedRapple></CompletedRapple>
              )}
            </Item>
          );
        })}
      </Layout>

      {isLoading && (
        <>
          <Load>
            <MainLoading />
          </Load>
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

const CompletedRapple = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.8;
`;

const Info = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
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

const Status = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 12px;
  top: 9px;
  font-size: 13px;
  > span:first-child {
    font-size: 14px;
    font-weight: 600;
  }
  > div:first-child {
    display: flex;
    align-items: center;
    > div {
      padding-left: 3px;
    }
  }
  > div:last-child {
    margin-top: 2px;
    align-self: flex-end;
    color: var(--font-h3);
  }
`;

const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 14px;
  gap: 14px;
`;

const Item = styled.div`
  height: 196px;
  background-color: var(--font-h7);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: var(--border-radius-sub);
  padding-bottom: var(--padding-sub);
`;

const Name = styled.span`
  font-weight: 600;
`;

const Point = styled.span`
  margin-top: var(--margin-min);
  color: var(--color-mint);
  font-size: 16px;
`;

const Load = styled.div``;

export default Store;
