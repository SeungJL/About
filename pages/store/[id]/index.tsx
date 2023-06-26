import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/MainLoading";
import Header from "../../../components/layouts/Header";
import ModalPortal from "../../../components/ModalPortal";
import { useStoreQuery } from "../../../hooks/store/queries";
import ApplyGiftModal from "../../../modals/Store/ApplyGiftModal";
import GiftWinnerModal from "../../../modals/Store/GiftWinnerModal";
import { STORE_GIFT } from "../../../storage/Store";
import { IStoreApplicant, IStoreGift } from "../../../types/store";

function StoreItem() {
  const router = useRouter();
  const itemId = Number(router.query?.id);

  const [isWinModal, setIsWinModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [applyData, setApplyData] = useState<IStoreApplicant[]>([]);

  const info: IStoreGift = STORE_GIFT[itemId];

  const dayjs = require("dayjs");
  require("dayjs/locale/ko");
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  dayjs.locale("ko");

  const { isOpen, onToggle } = useDisclosure();

  const { isLoading } = useStoreQuery(info?.giftId, {
    enabled: info !== undefined,
    onSuccess(data) {
      const temp = data?.users.filter((who) => who.cnt > 0 && who?.uid !== "7");
      setApplyData(temp);
    },
  });

  const totalApply = applyData?.reduce((acc, cur) => acc + cur.cnt, 0);

  const isCompleted = totalApply === info?.max;

  return (
    <>
      <Header title="상세 정보" url="/store" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          <ImageWrapper>
            <Image
              width={200}
              height={200}
              alt="storeGiftDetail"
              unoptimized={true}
              src={`${info?.image}`}
            />
            {isCompleted && (
              <CompletedRapple>
                <Circle>추첨 완료</Circle>
              </CompletedRapple>
            )}
          </ImageWrapper>
          <Overview>
            <span>{info?.name}</span>
            <span>{info?.brand}</span>
          </Overview>

          <Price>{info?.point} point</Price>
          <Nav>
            <span>
              현재 응모 숫자는 <b>{totalApply}회</b> 입니다.
            </span>
            <div>
              <Button size="lg" width="50%" onClick={onToggle}>
                참여현황
              </Button>
              {isCompleted ? (
                <Button
                  size="lg"
                  width="50%"
                  onClick={() => setIsWinModal(true)}
                >
                  당첨자 확인
                </Button>
              ) : (
                <Button size="lg" width="50%" onClick={() => setIsModal(true)}>
                  응모하기
                </Button>
              )}
            </div>
          </Nav>
          <Collapse in={isOpen} animateOpacity>
            <Box
              fontSize="13px"
              p="10px"
              mt="4"
              bg="gray.100"
              rounded="md"
              shadow="md"
              color="var(--font-h2)"
            >
              {applyData?.length === 0 ? (
                "참여 인원 없음"
              ) : (
                <Applicant>
                  {applyData?.map((who, idx) => (
                    <ApplicantBlock key={idx}>
                      <span>{who.name}</span>
                      <div>
                        <FontAwesomeIcon icon={faX} size="2xs" />
                      </div>
                      <span>{who.cnt} 회</span>
                    </ApplicantBlock>
                  ))}
                </Applicant>
              )}
            </Box>
          </Collapse>
          <Detail>
            <DetailItem>
              <span>추첨인원</span>
              <span>{info?.winner}명</span>
            </DetailItem>
            <DetailItem>
              <span>응모 가능 인원</span>
              <span>{info?.max}명</span>
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
      )}
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <ApplyGiftModal setIsModal={setIsModal} giftInfo={info} />
        </ModalPortal>
      )}
      {isWinModal && (
        <ModalPortal setIsModal={setIsWinModal}>
          <GiftWinnerModal
            setIsModal={setIsWinModal}
            applyData={applyData}
            win={info.winner}
          />
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
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 14px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
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

const Applicant = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ApplicantBlock = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  > div {
    margin: 0 6px;
  }
  > span:last-child {
  }
`;

const Nav = styled.nav`
  margin-top: 24px;
  display: flex;

  flex-direction: column;
  color: var(--font-h2);
  > div {
    margin-top: 14px;
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
