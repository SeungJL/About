import { Button, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import {
  faClock,
  faThumbsUp,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { ModalLayout } from "../../components/modals/Modals";
import { PROMOTION_WIN_DATE } from "../../constants/settingValue/dateSettingValue";
import { usePromotionQuery } from "../../hooks/sub/promotion/queries";
import { IPromotionApply } from "../../types/page/promotion";
import { IModal } from "../../types/reactTypes";

interface IPromotionAllCoolTimeModal extends IModal {
  promotionData: IPromotionApply[];
}

function PromotionAllCoolTimeModal({
  promotionData,
  setIsModal,
}: IPromotionAllCoolTimeModal) {
  const { data, isLoading } = usePromotionQuery();
  const applyCnt = data?.filter(
    (item) =>
      dayjs(item.lastDate) > dayjs(PROMOTION_WIN_DATE) &&
      item.uid !== "2259633694" &&
      item.uid !== "2636066822"
  ).length;

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader display="flex" justifyContent="space-between">
        <Detail>
          <span>전체 홍보 현황</span>
          <Explanation>
            <div>
              <FontAwesomeIcon icon={faThumbsUp} color="var(--color-mint)" />
              <span>신청 가능</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} color="var(--color-red)" />
              <span>쿨타임</span>
            </div>
          </Explanation>
        </Detail>
        <div onClick={() => setIsModal(false)}>
          <FontAwesomeIcon icon={faXmark} size="lg" color="var(--font-h2)" />
        </div>
      </ModalHeader>
      <ModalBody
        p="var(--padding-min) var(--padding-main)"
        display="flex"
        flexDir="column"
        position="relative"
        overflowY="auto"
      >
        <Container>
          {promotionData?.map((item) => {
            const cool = dayjs(item.lastDate)
              .add(3, "day")
              .diff(dayjs(), "hours");

            return (
              <Item key={item.name}>
                <UniName>
                  {item.name.length <= 6
                    ? item.name
                    : item.name.slice(0, 5) + "..."}
                </UniName>
                <CoolTime>
                  {cool >= 1 ? (
                    <Cool>
                      <FontAwesomeIcon icon={faClock} />
                      {cool >= 24 ? (
                        <span>{Math.ceil(cool / 24)}일</span>
                      ) : (
                        <span>{cool}H</span>
                      )}
                    </Cool>
                  ) : (
                    <Ok>
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <span />
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <span />
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </Ok>
                  )}
                </CoolTime>
              </Item>
            );
          })}
        </Container>
      </ModalBody>
      <ModalFooter
        p="var(--padding-sub) var(--padding-main)"
        display="flex"
        justifyContent="space-between"
      >
        {!isLoading && (
          <Sum>
            <span>
              홍보 인원: <b>{applyCnt}명</b>,
            </span>
            <span>
              현재 당첨률:
              <b>{applyCnt < 2 ? "100" : Math.round((3 / applyCnt) * 100)}%</b>
            </span>
          </Sum>
        )}
        <Button
          variant="ghost"
          color="var(--color-mint)"
          onClick={() => setIsModal(false)}
        >
          확인
        </Button>
      </ModalFooter>
    </ModalLayout>
  );
}

const Detail = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--font-h1);
`;

const Explanation = styled.div`
  font-size: 12px;
  display: flex;
  margin-left: var(--margin-min);
  align-items: center;
  > div {
    font-weight: 400;
    margin-left: var(--margin-md);
    > span {
      margin-left: var(--margin-min);
      color: var(--font-h3);
    }
  }
`;

const Container = styled.div`
  border: var(--border-mint);
  border-radius: var(--border-radius-main);
  padding: var(--padding-md);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, auto));
  grid-auto-rows: 36px;
  gap: var(--margin-md) var(--margin-sub);
  overflow-y: auto;
`;

const Item = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--padding-min);
`;

const UniName = styled.div`
  flex: 0.65;
`;

const CoolTime = styled.div`
  flex: 0.35;
`;

const Cool = styled.div`
  padding: 0 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-red);
`;

const Ok = styled.div`
  display: flex;
  color: var(--color-mint);
  align-items: center;
  > span {
    margin: 0 1px;
  }
`;

const Sum = styled.div`
  font-size: 12px;
  margin-left: var(--margin-min);
  color: var(--font-h2);

  > span:first-child {
    margin-right: var(--margin-min);
  }
`;

export const ModalFooterNav = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: auto;

  > button {
    font-size: 14px;
    font-weight: 600;
    margin-right: var(--margin-min);
    cursor: pointer;
  }
`;

export default PromotionAllCoolTimeModal;
