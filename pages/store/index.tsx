import { faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import Header from "../../components/layout/Header";
import { useStoreGiftEntryQuery } from "../../hooks/store/queries";
import StoreRuleModal from "../../modals/store/StoreRuleModal";
import { STORE_GIFT_ACTIVE, STORE_GIFT_inActive } from "../../storage/Store";
import { IStoreApplicant } from "../../types/page/store";

import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { StoreGiftImage } from "../../components/utils/DesignAdjustment";
import { transferStoreGiftDataState } from "../../recoil/transferDataAtoms";
import { IStoreGift } from "../../types/page/store";

export interface IGiftEntry extends IStoreGift {
  users: IStoreApplicant[];
  totalCnt: number;
}
interface IGiftEntries {
  active: IGiftEntry[];
  inactive: IGiftEntry[];
}

function Store() {
  const router = useRouter();
  const [giftEntries, setGiftEntries] = useState<IGiftEntries>({
    active: STORE_GIFT_ACTIVE.map((gift) => ({
      ...gift,
      users: [],
      totalCnt: 0,
    })),
    inactive: STORE_GIFT_inActive.map((gift) => ({
      ...gift,
      users: [],
      totalCnt: 0,
    })),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isShowActive, setIsShowActive] = useState(true);
  const [isModal, setIsModal] = useState(false);

  const setTransferStoreGiftData = useSetRecoilState(
    transferStoreGiftDataState
  );

  const { data: storeGiftEntries } = useStoreGiftEntryQuery({});

  useEffect(() => {
    if (!storeGiftEntries) return;
    const temp: IGiftEntries = {
      active: [...giftEntries.active],
      inactive: [...giftEntries.inactive],
    };
    storeGiftEntries.users.forEach((who) => {
      const giftId = who.giftId;
      const gift =
        temp.active.find((item) => item.giftId === giftId) ||
        temp.inactive.find((item) => item.giftId === giftId);
      if (gift) {
        gift.users.push(who);
        gift.totalCnt += who.cnt;
      }
    });
    setGiftEntries(temp);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeGiftEntries]);

  const giftArr = isShowActive ? giftEntries.active : giftEntries.inactive;

  const onClickGift = (item: IGiftEntry) => {
    setTransferStoreGiftData({ isActive: isShowActive, data: item });
    router.push(`/store/${item.giftId}`);
  };

  return (
    <>
      <Header title="포인트 스토어" url="/point">
        <RuleIcon setIsModal={setIsModal} />
      </Header>
      <Layout>
        <Nav>
          <Button
            onClick={() => setIsShowActive(true)}
            colorScheme={isShowActive ? "mintTheme" : "gray"}
          >
            현재 상품
          </Button>
          <Button
            onClick={() => setIsShowActive(false)}
            colorScheme={!isShowActive ? "mintTheme" : "gray"}
          >
            지난 상품
          </Button>
        </Nav>
        {!isLoading && (
          <Container>
            {giftArr.map((item, idx) => (
              <Item key={idx} onClick={() => onClickGift(item)}>
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
                    <span>{item.totalCnt}</span>
                    <span>/{item.max}</span>
                  </ApplyCnt>
                </Status>
                <ImageWrapper>
                  <StoreGiftImage
                    imageSrc={item.image}
                    giftId={item.giftId}
                    isImagePriority={idx < 6}
                  />
                  {!isShowActive && <Circle>추첨 완료</Circle>}
                </ImageWrapper>
                <Info>
                  <Name>{item.name}</Name>
                  <Point>{item.point} point</Point>
                </Info>
                {!isShowActive && <CompletedRapple />}
              </Item>
            ))}
          </Container>
        )}
      </Layout>

      {isModal && <StoreRuleModal setIsModal={setIsModal} />}
    </>
  );
}
const Layout = styled.div`
  margin: 0 var(--margin-main);
`;

const Nav = styled.nav`
  margin-top: var(--margin-sub);
  display: flex;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;

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
