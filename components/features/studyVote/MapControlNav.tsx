import { Button } from "@chakra-ui/react";
import { faRotate } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { createNaverMapDot } from "../../../helpers/utilHelpers";

type ReturnDot = "center" | "장안구" | "영통구" | "권선구";
function MapControlNav({ naverMap }) {
  const onClickRetrun = (type: ReturnDot) => {
    const returnDot = getReturnDot(type);
    naverMap.setCenter(returnDot);
  };

  const getReturnDot = (type: ReturnDot) => {
    switch (type) {
      case "center":
        return createNaverMapDot(37.2789488, 127.0429329);
      case "장안구":
        return createNaverMapDot(37.2965, 126.999691);
      case "권선구":
        return createNaverMapDot(37.264836, 126.991827);
      case "영통구":
        return createNaverMapDot(37.254727, 127.064505);
    }
  };

  return (
    <Layout>
      <ReturnBtn onClick={() => onClickRetrun("center")}>
        <FontAwesomeIcon icon={faRotate} size="lg" />
      </ReturnBtn>
      <Button
        colorScheme="blackAlpha"
        size="sm"
        onClick={() => onClickRetrun("center")}
      >
        가운데로
      </Button>
      <Button
        colorScheme="blackAlpha"
        size="sm"
        onClick={() => onClickRetrun("장안구")}
      >
        장안구
      </Button>
      <Button
        colorScheme="blackAlpha"
        size="sm"
        onClick={() => onClickRetrun("영통구")}
      >
        영통구
      </Button>
      <Button
        colorScheme="blackAlpha"
        size="sm"
        onClick={() => onClickRetrun("권선구")}
      >
        권선구
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  position: absolute;
  top: var(--margin-sub);
  left: var(--margin-sub);
  > button {
    margin-right: var(--margin-min);
  }
  > button:first-child {
    margin-right: var(--margin-md);
  }
`;
const ReturnBtn = styled.button`
  background-color: var(--font-h6);
  padding: 4px;
  border-radius: 50%;
  margin-right: var(--margin-md);
`;

export default MapControlNav;
