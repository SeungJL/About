import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { IModal } from "../../../types/reactTypes";

interface IMapBottomNav extends IModal {}

function MapBottomNav({ setIsModal }: IMapBottomNav) {
  return (
    <Layout>
      <Button size="lg">시간 선택</Button>
      <Button size="lg" onClick={() => setIsModal(false)}>
        닫기
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    margin-top: var(--margin-sub);
    width: 80%;
  }
`;

export default MapBottomNav;
