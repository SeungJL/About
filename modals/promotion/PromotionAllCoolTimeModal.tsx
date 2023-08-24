import {
  faClock,
  faThumbsUp,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { ModalLayout } from "../../components/common/modal/Modals";
import { useUserRequestCategoryQuery } from "../../hooks/user/queries";
import { ModalMain } from "../../styles/layout/modal";
import { IPromotionApply } from "../../types/page/promotion";
import { IModal } from "../../types/reactTypes";

interface IPromotionAllCoolTimeModal extends IModal {
  promotionData: IPromotionApply[];
}

function PromotionAllCoolTimeModal({
  promotionData,
  setIsModal,
}: IPromotionAllCoolTimeModal) {
  const { data, isLoading } = useUserRequestCategoryQuery("홍보");
  const applyCnt = data?.length + 15;

  return (
    <ModalLayout size="xl">
      <ModalHeaderXLayout>
        <div>
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
        </div>
        <div onClick={() => setIsModal(false)}>
          <FontAwesomeIcon icon={faXmark} size="lg" color="var(--font-h2)" />
        </div>
      </ModalHeaderXLayout>
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
      <ModalFooterNav>
        <Sum>
          <span>{dayjs().add(1, "month").month()}월 누적:</span>
          <span>{!isLoading && applyCnt}회</span>
        </Sum>
        <button onClick={() => setIsModal(false)}>확인</button>
      </ModalFooterNav>
    </ModalLayout>
  );
}
const ModalHeaderXLayout = styled.div`
  display: flex;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    color: var(--font-h1);
  }
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

const Container = styled(ModalMain)`
  border: var(--border-mint);
  border-radius: var(--border-radius-main);
  padding: var(--padding-main) var(--padding-sub);
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
  > span:last-child {
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
