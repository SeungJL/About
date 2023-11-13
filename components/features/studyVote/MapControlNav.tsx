import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { faBullseyeArrow, faRotate } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { createNaverMapDot } from "../../../helpers/utilHelpers";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { useStudyPreferenceQuery } from "../../../hooks/study/queries";
import { locationState } from "../../../recoil/userAtoms";
import {
  DispatchBoolean,
  DispatchNumber,
  DispatchType,
} from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/study";
type ReturnDot = "중앙" | "동쪽" | "서쪽" | "남쪽" | "북쪽";

interface IMapControlNav extends IPrecisionPopOver {
  naverMap: any;
  setVoteInfo: DispatchType<IStudyParticipate>;
  setIsCheckPreSet: DispatchBoolean;
}

function MapControlNav({
  naverMap,
  setVoteInfo,
  setIsCheckPreSet,
  precision,
  setPrecision,
}: IMapControlNav) {
  const failToast = useFailToast();
  const { data } = useStudyPreferenceQuery();

  const location = useRecoilValue(locationState);
  const [preSet, setPreSet] = useState<"first" | "second">();

  const onClickRetrun = (type: ReturnDot) => {
    const LOCATION_RETURN_DOT = {
      수원: {
        중앙: createNaverMapDot(37.2789488, 127.0429329),
        서쪽: createNaverMapDot(37.278888, 126.991981),
        북쪽: createNaverMapDot(37.287918, 127.027491),
        동쪽: createNaverMapDot(37.268884, 127.058477),
      },
      양천: {
        중앙: createNaverMapDot(37.527588, 126.896441),
        서쪽: createNaverMapDot(37.530588, 126.856441),
        동쪽: createNaverMapDot(37.517588, 126.906441),
      },
    };
    setVoteInfo(null);
    const returnDot = LOCATION_RETURN_DOT[location][type];

    naverMap.setCenter(returnDot);
  };

  const onClickPreSet = (type: "first" | "second") => {
    if (!data) {
      failToast("free", "설정된 스터디 프리렛이 없습니다.");
      return;
    }
    setIsCheckPreSet(true);
    if (preSet === type) {
      setVoteInfo((old) => ({
        ...old,
        place: null,
        subPlace: null,
      }));
      setIsCheckPreSet(null);
      setPreSet(null);
      setPrecision(null);
      return;
    }
    setVoteInfo((old) => ({
      ...old,
      place: data.place,
      subPlace: data.subPlace,
    }));
    naverMap.setCenter(
      createNaverMapDot(data.place.latitude, data.place.longitude)
    );
    setPrecision(2);
    setPreSet(type);
  };

  return (
    <Layout>
      <TopNav>
        <ReturnBtn onClick={() => onClickRetrun("중앙")}>
          <FontAwesomeIcon icon={faRotate} />
        </ReturnBtn>
        <Button
          colorScheme="blackAlpha"
          size="sm"
          onClick={() => onClickRetrun("중앙")}
        >
          중앙
        </Button>
        <Button
          colorScheme="blackAlpha"
          size="sm"
          onClick={() => onClickRetrun("서쪽")}
        >
          서쪽
        </Button>
        <Button
          colorScheme="blackAlpha"
          size="sm"
          onClick={() => onClickRetrun("동쪽")}
        >
          동쪽
        </Button>
        {location !== "양천" && (
          <Button
            colorScheme="blackAlpha"
            size="sm"
            onClick={() => onClickRetrun("북쪽")}
          >
            북쪽
          </Button>
        )}
        <PrecisionPopOver precision={precision} setPrecision={setPrecision} />
      </TopNav>
      <BottomNav>
        <Button
          size="sm"
          border={preSet !== "first" && "1px solid var(--font-h4)"}
          colorScheme={preSet === "first" ? "mintTheme" : "gray"}
          mr="var(--margin-md)"
          onClick={() => onClickPreSet("first")}
        >
          1
        </Button>
        <Button size="sm" border="1px solid var(--font-h4)">
          2
        </Button>
      </BottomNav>
    </Layout>
  );
}

interface IPrecisionPopOver {
  precision: number;
  setPrecision: DispatchNumber;
}

export const PrecisionPopOver = ({ precision, setPrecision }) => (
  <Popover>
    <PopoverTrigger>
      <TargetIcon>
        <FontAwesomeIcon icon={faBullseyeArrow} size="xl" />
      </TargetIcon>
    </PopoverTrigger>
    <PopoverContent
      w="120px"
      mr="var(--margin-md)"
      fontSize="12px"
      _focus={{ outline: "none" }}
    >
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontWeight="600">정밀도 단계</PopoverHeader>
      <PopoverBody display="flex" p="var(--padding-md)">
        <Button
          colorScheme={precision === 0 ? "mintTheme" : "gray"}
          size="xs"
          mr="var(--margin-md)"
          onClick={() => setPrecision(0)}
        >
          0
        </Button>
        <Button
          colorScheme={precision === 1 ? "mintTheme" : "gray"}
          size="xs"
          mr="var(--margin-md)"
          onClick={() => setPrecision(1)}
        >
          1
        </Button>
        <Button
          onClick={() => setPrecision(2)}
          colorScheme={precision === 2 ? "mintTheme" : "gray"}
          size="xs"
        >
          2
        </Button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

const Layout = styled.div``;

const TopNav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: var(--margin-md);
  left: var(--margin-md);
  > button {
    margin-right: var(--margin-min);
  }
  > button:first-child {
    margin-right: var(--margin-md);
  }
  > button:last-child {
    margin-right: var(--margin-main);
  }
`;

const BottomNav = styled.nav`
  position: absolute;
  bottom: var(--margin-md);
  left: var(--margin-md);
  z-index: 50;
`;

const ReturnBtn = styled.button`
  width: 28px;
  height: 28px;
  background-color: var(--font-h6);
  padding: 4px;
  border-radius: 50%;
  margin-right: var(--margin-md);
`;

const TargetIcon = styled.button`
  padding: var(--padding-min);
  margin-left: auto;
  margin-right: var(--margin-main) !important;
`;

export default MapControlNav;
