import { faBalanceScale, faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import ModalPortal from "../../components/common/ModalPortal";
import Header from "../../components/layout/Header";
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
        if (giftIdx > 6 || who?.uid === "7" || who?.cnt < 1) return;
        temp[giftIdx - 1] += who?.cnt;
        setApplyNum(temp);
      });
    },
  });

  return (
    <>
      <Header title="포인트 추첨" url="point">
        <FontAwesomeIcon
          icon={faBalanceScale}
          size="lg"
          onClick={() => setIsModal(true)}
        />
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
                <Image
                  width={ITEM_WIDTH}
                  height={ITEM_WIDTH}
                  alt="storeGift"
                  unoptimized={true}
                  src={item.image}
                />
                {item?.max === applyNum[idx] && <Circle>추첨 완료</Circle>}
              </ImageWrapper>
              <Name>{item.name}</Name>

              <Point>{item.point} point</Point>
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
  margin-top: 8px;
  position: relative;
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
`;

const Name = styled.span`
  font-weight: 600;
`;

const Point = styled.span`
  color: var(--color-mint);
  font-size: 16px;
  margin-top: auto;
  margin-bottom: 12px;
`;

const Load = styled.div``;

export default Store;
