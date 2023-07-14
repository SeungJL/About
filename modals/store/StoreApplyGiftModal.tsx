import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import SkeletonItem from "../../components/common/skeleton/SkeletonItem";
import CountNum from "../../components/utils/CountNum";
import { useStoreMutation } from "../../hooks/store/mutation";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/ui/CustomToast";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import { usePointQuery } from "../../hooks/user/pointSystem/queries";
import { ModalMain } from "../../styles/layout/modal";
import { DispatchBoolean, IModal } from "../../types/common";
import { IStoreApplicant, IStoreGift } from "../../types/store";

interface IStoreApplyGiftModal extends IModal {
  giftInfo: IStoreGift;
  setIsRefetch: DispatchBoolean;
}

function StoreApplyGiftModal({
  setIsModal,
  giftInfo,
  setIsRefetch,
}: IStoreApplyGiftModal) {
  const { data: session } = useSession();
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const isGuest = session?.user.name === "guest";

  const [value, setValue] = useState(1);

  const { data: myPoint, isLoading } = usePointQuery();
  const { mutate: applyGift } = useStoreMutation({
    onSuccess() {
      getPoint({ value: -totalCost, message: `${giftInfo.name}응모` });
      setIsRefetch(true);
      completeToast("free", "응모에 성공했어요! 당첨 발표일을 기다려주세요!");
    },
    onError: errorToast,
  });
  const { mutate: getPoint } = usePointMutation();

  const totalCost = giftInfo.point * value;

  const onApply = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    if (myPoint.point < totalCost) {
      failToast("free", "보유중인 포인트가 부족해요!");
      return;
    }
    const info: IStoreApplicant = {
      name: session.user.name,
      uid: session.uid,
      cnt: value,
      giftId: giftInfo.giftId,
    };
    applyGift(info);
    setIsModal(false);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderXLine title="상품 응모" setIsModal={setIsModal} />
      <ModalMain>
        {!isLoading ? (
          <>
            <Item>
              <span>상품</span>
              <span>{giftInfo?.name}</span>
            </Item>
            <Item>
              <span>보유 포인트</span>
              <span>{myPoint.point} point</span>
            </Item>
            <Item>
              <span>필요 포인트</span>
              <NeedPoint overMax={totalCost > myPoint.point}>
                {totalCost} point
              </NeedPoint>
            </Item>
          </>
        ) : (
          <>
            <Item>
              <span>상품</span>
              <SkeletonItem w={100} />
            </Item>
            <Item>
              <span>보유 포인트</span>
              <SkeletonItem w={50} />
            </Item>
            <Item>
              <span>필요 포인트</span>
              <SkeletonItem w={50} />
            </Item>
          </>
        )}
        <CountNav>
          <CountNum value={value} setValue={setValue} />
        </CountNav>
      </ModalMain>
      <Footer>
        <Button
          width="100%"
          backgroundColor="var(--color-mint)"
          onClick={onApply}
          color="white"
        >
          응모하기
        </Button>
      </Footer>
    </ModalLayout>
  );
}

const Item = styled.div`
  display: flex;
  margin-bottom: var(--margin-min);
  > span:first-child {
    display: inline-block;
    width: 80px;
    font-weight: 600;
  }
`;

const NeedPoint = styled.span<{ overMax: boolean }>`
  color: ${(props) => props.overMax && "var(--color-red)"};
`;

const CountNav = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Footer = styled.footer``;

export default StoreApplyGiftModal;
