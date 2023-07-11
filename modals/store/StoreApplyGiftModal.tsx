import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/layouts/Modals";
import CountNum from "../../components/utils/CountNum";
import { useStoreMutation } from "../../hooks/store/mutation";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";

import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import { usePointQuery } from "../../hooks/user/pointSystem/queries";

import { ModalMain, ModalXs } from "../../styles/layout/modal";
import { IStoreApplicant, IStoreGift } from "../../types/store";

interface IStoreApplyGiftModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  giftInfo: IStoreGift;
}

function StoreApplyGiftModal({ setIsModal, giftInfo }: IStoreApplyGiftModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const router = useRouter();
  const { data: session } = useSession();

  const isGuest = session?.user.name === "guest";
  const { data: myPoint } = usePointQuery();
  const [value, setValue] = useState(1);

  const { mutate } = useStoreMutation();
  const { mutate: getPoint } = usePointMutation();

  const totalCost = giftInfo.point * value;

  const onApply = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    if (myPoint?.point < totalCost) {
      failToast("free", "보유중인 포인트가 부족해요!");
      return;
    }
    const info: IStoreApplicant = {
      name: session.user.name,
      uid: session && session?.uid,
      cnt: value,
      giftId: giftInfo?.giftId,
    };
    mutate(info);
    getPoint({ value: -totalCost, message: `${giftInfo?.name}응모` });
    completeToast("free", "응모에 성공했어요! 당첨 발표일을 기다려주세요!");
    setTimeout(() => {
      router.push(`/store`);
    }, 600);
    setIsModal(false);
  };

  return (
    <Layout>
      <ModalHeaderXLine title="응모" setIsModal={setIsModal} />
      <ModalMain>
        <Title>
          <b>상품</b>
          <span>{giftInfo?.name}</span>
        </Title>
        <Price>
          <span>
            <b>보유 포인트</b>&nbsp;
            <span>{myPoint?.point} point</span>
          </span>
          <span>
            <b>필요 포인트</b>&nbsp;
            <PricePoint overMax={totalCost > myPoint?.point}>
              {totalCost} point
            </PricePoint>
          </span>
        </Price>
        <CountNav>
          <CountNum value={value} setValue={setValue} />
        </CountNav>
      </ModalMain>
      <Footer>
        <Button
          width="100%"
          backgroundColor={"var(--color-mint)"}
          onClick={onApply}
          color="white"
        >
          응모하기
        </Button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalXs)``;

const Title = styled.div`
  font-size: 13px;
  margin-bottom: 2px;
  > b {
    color: var(--font-h1);
    margin-right: 4px;
  }
  > span {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    display: inline-block;
    margin-bottom: 2px;

    > span {
      font-size: 14px;
    }
    > b {
      color: var(--font-h1);
      margin-right: 4px;
    }
  }
`;
const PricePoint = styled.span<{ overMax: boolean }>`
  color: ${(props) => props.overMax && "var(--color-red)"};
`;

const CountNav = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 6px;
`;

const Footer = styled.footer``;

export default StoreApplyGiftModal;
