import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/layouts/Header";
import ModalPortal from "../../../components/ModalPortal";
import ApplyGiftModal from "../../../modals/store/ApplyGiftModal";
import StoreNavigation from "../../../pagesComponents/store/item/StoreNavigation";
import { STORE_GIFT } from "../../../storage/Store";
import { IStoreGift } from "../../../types/store";

function StoreItem() {
  const router = useRouter();
  const itemId = Number(router.query?.id);

  const [isLoading, setIsLoading] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const info: IStoreGift = STORE_GIFT[itemId];
  const dayjs = require("dayjs");
  require("dayjs/locale/ko");
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  dayjs.locale("ko");
  console.log(1234);
  const date = info?.date;
  return (
    <>
      <Header title="기프티콘 추첨" url="/store" />
      <Layout>
        <ImageWrapper>
          <Image
            width={200}
            height={200}
            alt="storeGiftDetail"
            unoptimized={true}
            src={`${info?.image}`}
            onLoad={() => setIsLoading(false)}
          />
        </ImageWrapper>
        <Overview>
          <span>{info?.name}</span>
          <span>{info?.brand}</span>
        </Overview>
        {/* <Date>05.01 ~ 05.14</Date> */}
        <Price>{info?.point} point</Price>
        <Nav>
          <span>
            현재 참여 인원은 <b>0명</b> 입니다.
          </span>
          <div>
            <Button size="lg" width="50%">
              참여현황
            </Button>
            <Button size="lg" width="50%" onClick={() => setIsModal(true)}>
              응모하기
            </Button>
          </div>
        </Nav>
        <Detail>
          <DetailItem>
            <span>추첨인원</span>
            <span>{info?.winner}명</span>
          </DetailItem>
          <DetailItem>
            <span>응모기간</span>
            <span>
              {date?.startDay.format("M.D")}({date?.startDay.format("ddd")})
              &nbsp;~&nbsp;
              {date?.endDay.format("M.D")}({date?.endDay.format("ddd")})
              {/* 5.8(월) ~ 5.21(일) */}
            </span>
          </DetailItem>
          <DetailItem>
            <span>당첨자 발표일</span>
            <span>
              {date?.endDay.add(1, "day").format("M.D")}(
              {date?.endDay.add(1, "day").format("ddd")})
            </span>
          </DetailItem>
          <DetailItem>
            <span>안내사항</span>
            <div>
              <span>당첨자는 중복되지 않습니다.</span>
              <span>
                당첨자가 연락이 안되는 경우, 예비 당첨자로 순번이 넘어갑니다.
              </span>
              <span></span>
            </div>
          </DetailItem>
        </Detail>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <ApplyGiftModal setIsModal={setIsModal} info={info} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 14px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  margin-bottom: 12px;
  > span:first-child {
    font-size: 18px;
    font-weight: 800;
  }
  > span:last-child {
    color: var(--font-h3);
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;

  font-size: 18px;
  color: var(--color-mint);
`;

const Nav = styled.nav`
  margin-top: 24px;
  display: flex;

  flex-direction: column;
  > div {
    margin-top: 12px;
    display: flex;
    > button:first-child {
      color: var(--color-mint);
      margin-right: 8px;
    }
    > button:last-child {
      background-color: var(--color-mint);
      color: white;
    }
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const DetailItem = styled.div`
  display: flex;
  font-size: 13px;
  color: var(--font-h2);
  margin-bottom: 4px;
  > span:first-child {
    color: var(--font-h1);

    display: inline-block;
    font-weight: 600;
    width: 98px;
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export default StoreItem;
