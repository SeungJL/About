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
import {
  faBullseyeArrow,
  faRotateRight,
} from "@fortawesome/pro-regular-svg-icons";
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

  const navArr: ReturnDot[] = ["중앙", "서쪽", "동쪽", "북쪽"];

  const filterArr: ReturnDot[] = navArr.filter((dot) => {
    if (location === "양천" && dot === "북쪽") return false;
    return true;
  });

  const onClickSecond = () => {
    failToast("free", "2번 프리셋이 존재하지 않습니다.");
  };

  return (
    <Layout>
      <TopNav>
        <div>
          <ReturnBtn onClick={() => onClickRetrun("중앙")}>
            <FontAwesomeIcon icon={faRotateRight} size="lg" />
          </ReturnBtn>
          {filterArr.map((item) => (
            <Button
              key={item}
              bg="white"
              borderRadius="var(--border-radius2)"
              size="sm"
              onClick={() => onClickRetrun(item)}
              fontSize="14px"
              color="var(--font-h2)"
              p="var(--padding-md) var(--padding-sub)"
              h="34px"
              w="50px"
            >
              {item}
            </Button>
          ))}
        </div>
        <PrecisionPopOver precision={precision} setPrecision={setPrecision} />
      </TopNav>
      <BottomNav>
        <Button
          size="sm"
          w="34px"
          h="34px"
          border={preSet !== "first" && "1px solid var(--font-h4)"}
          bgColor={
            preSet === "first" ? "var(--color-mint) !important" : "white"
          }
          color={preSet === "first" ? "white !important" : "var(--font-h2)"}
          mr="var(--margin-md)"
          onClick={() => onClickPreSet("first")}
        >
          1
        </Button>
        <Button
          w="34px"
          h="34px"
          bgColor={preSet === "second" ? "var(--color-mint)" : "white"}
          color={preSet === "second" ? "white !important" : "var(--font-h2)"}
          size="sm"
          border="1px solid var(--font-h4)"
          onClick={() => onClickSecond()}
        >
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
        <Button
          borderRadius="4px"
          w="34px"
          h="34px"
          border="1px solid var(--font-h5)"
          bg="white"
        >
          <FontAwesomeIcon icon={faBullseyeArrow} size="xl" />
        </Button>
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
  padding: var(--padding-sub) var(--padding-main);
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;

    button {
      margin-right: var(--margin-min);
    }
  }
`;

const BottomNav = styled.nav`
  position: absolute;
  bottom: var(--margin-md);
  left: var(--margin-md);
  z-index: 50;
`;

const PreciseBtn = styled.button``;

const ReturnBtn = styled.button`
  width: 34px;
  height: 34px;
  background-color: var(--color-mint);
  color: white;
  padding: 4px;
  border-radius: var(--border-radius2);
  border: 1px solid var(--font-h5);
`;

const TargetIcon = styled.button``;

export default MapControlNav;
