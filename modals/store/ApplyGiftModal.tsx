import { Button } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/ui/Modal";
import CountNum from "../../components/utils/CountNum";
import {
  ModalHeaderLine,
  ModalLg,
  ModalMain,
  ModalMd,
  ModalSubtitle,
  ModalXs,
} from "../../styles/layout/modal";
import { IStoreGift } from "../../types/store";

function ApplyGiftModal({
  setIsModal,
  info,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  info: IStoreGift;
}) {
  const myPoint = 70;
  const [value, setValue] = useState(1);

  const totalCost = info.point * value;
  return (
    <Layout>
      <ModalHeaderXLine title="응모" setIsModal={setIsModal} />
      <ModalMain>
        <Title>
          <b>상품:</b> 스타벅스 아메리카노
        </Title>
        <Price>
          <span>
            <b>보유 포인트</b> {myPoint} point
          </span>
          <span>
            <b>필요 포인트:</b>
            <PricePoint overMax={totalCost > myPoint}>
              {totalCost}
            </PricePoint>{" "}
            point
          </span>
        </Price>
        <CountNum value={value} setValue={setValue} />
      </ModalMain>
      <Footer>
        <Button width="100%">응모하기</Button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalMd)``;

const Title = styled.div`
  margin-bottom: 4px;
  > b {
    color: var(--font-h1);
    margin-right: 4px;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    display: inline-block;
    margin-bottom: 4px;
    > b {
      margin-right: 4px;
    }
  }
`;
const PricePoint = styled.span<{ overMax: boolean }>`
  color: ${(props) => props.overMax && "var(--color-red)"};
`;

const CountNav = styled.nav``;

const Footer = styled.footer``;

export default ApplyGiftModal;
