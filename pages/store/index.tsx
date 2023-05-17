import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Image from "next/image";
import { useState } from "react";
import { FullScreen } from "../../styles/layout/modal";
import { MainLoading } from "../../components/ui/Loading";
import { STORE_GIFT } from "../../storage/Store";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useScoreAllQuery } from "../../hooks/user/pointSystem/queries";
import { useStoreAllQuery } from "../../hooks/store/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faTrophy } from "@fortawesome/free-solid-svg-icons";
import ModalPortal from "../../components/ModalPortal";
import StoreRuleModal from "../../modals/store/StoreRuleModal";

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
        temp[giftIdx - 1]++;
        setApplyNum(temp);
      });
    },
  });

  return (
    <>
      <Header title="포인트 추첨">
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
            <Item key={idx}>
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
                  onClick={() => router.push(`/store/${idx}`)}
                />
              </ImageWrapper>
              <Name>{item.name}</Name>

              <Point>{item.point} point</Point>
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
`;

const Circle = styled.div`
  padding: 2px;
  width: 24px;
  height: 24px;
  text-align: center;
  font-weight: 600;

  border: 1.5px solid var(--font-h1);
  border-radius: 50%;
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
  border-radius: var(--border-radius);
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  align-items: center;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Date = styled.span`
  font-size: 13px;
  color: var(--font-h2);
`;

const Point = styled.span`
  color: var(--color-mint);
  font-size: 16px;
  margin-top: auto;
  margin-bottom: 12px;
`;

const Load = styled.div``;

export default Store;
