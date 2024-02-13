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
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainLoadingAbsolute } from "../../../components/common/loaders/MainLoading";
import { STUDY_PREFERENCE_LOCAL } from "../../../constants/keys/queryKeys";
import { createNaverMapDot } from "../../../helpers/utilHelpers";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { useStudyPreferenceQuery } from "../../../hooks/study/queries";
import StudyQuickVoteRegisterModal from "../../../modals/study/studyQuickVoteModal/StudyQuickVoteRegisterModal";
import { locationState, userInfoState } from "../../../recoil/userAtoms";
import {
  DispatchBoolean,
  DispatchNumber,
  DispatchType,
} from "../../../types/reactTypes";
import { IStudyParticipate, IStudyPlaces } from "../../../types/study/study";
type ReturnDot = "중앙" | "동쪽" | "서쪽" | "남쪽" | "북쪽";

interface IMapControlNav extends IPrecisionPopOver {
  naverMap: any;
  setVoteInfo: DispatchType<IStudyParticipate>;
  setIsCheckPreSet: DispatchBoolean;
  isCheckPreset: boolean;
}

function MapControlNav({
  naverMap,
  setVoteInfo,
  isCheckPreset,
  setIsCheckPreSet,
  precision,
  setPrecision,
}: IMapControlNav) {
  const [preferInfo, setPreferInfo] = useState<IStudyPlaces>();
  const failToast = useFailToast();
  const localValue = localStorage.getItem(STUDY_PREFERENCE_LOCAL);

  const { data, isLoading } = useStudyPreferenceQuery({
    enabled: !localValue || localValue === "undefined",
  });

  const location = useRecoilValue(locationState);
  const userInfo = useRecoilValue(userInfoState);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (localValue && localValue !== "undefined") {
      const value = JSON.parse(localValue);
      if (
        (value as IStudyPlaces)?.place?.location !== location &&
        userInfo?.location === location
      ) {
        if (isModal === false) {
          failToast("free", "스터디 프리셋 변경이 필요합니다.");
          setIsModal(true);
        }
        return;
      }
      setPreferInfo(value);
    } else {
      if (!isLoading) {
        if (!data) {
          setIsModal(true);
          return;
        }
        localStorage.setItem(STUDY_PREFERENCE_LOCAL, JSON.stringify(data));
        setPreferInfo(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  const [preSet, setPreSet] = useState<"first" | "second">(
    isCheckPreset ? "first" : null
  );

  const onClickRetrun = (type: ReturnDot) => {
    const LOCATION_RETURN_DOT = {
      수원: {
        중앙: createNaverMapDot(37.2789488, 127.0429329),
        서쪽: createNaverMapDot(37.278888, 126.991981),
        북쪽: createNaverMapDot(37.287918, 127.027491),
        동쪽: createNaverMapDot(37.268884, 127.058477),
      },
      강남: {
        중앙: createNaverMapDot(37.503744, 127.048898),
      },
      안양: {
        중앙: createNaverMapDot(37.388896, 126.950088),
      },
      양천: {
        중앙: createNaverMapDot(37.527588, 126.896441),
        서쪽: createNaverMapDot(37.530588, 126.856441),
        동쪽: createNaverMapDot(37.517588, 126.906441),
      },
      동대문: {
        중앙: createNaverMapDot(37.58452, 127.041047),
        서쪽: createNaverMapDot(37.582025, 127.003554),
        북쪽: createNaverMapDot(37.601182, 127.04285),
      },
    };
    setVoteInfo(null);
    const returnDot = LOCATION_RETURN_DOT[location][type];

    naverMap.setCenter(returnDot);
  };

  useEffect(() => {
    if (
      isCheckPreset &&
      preferInfo &&
      naverMap &&
      location === userInfo?.location
    ) {
      setVoteInfo((old) => ({
        ...old,
        place: preferInfo.place,
        subPlace: preferInfo.subPlace,
      }));
      naverMap.setCenter(
        createNaverMapDot(preferInfo.place.latitude, preferInfo.place.longitude)
      );
      setPrecision(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferInfo, isCheckPreset, naverMap]);

  const onClickPreSet = (type: "first" | "second") => {
    if (!preferInfo) {
      failToast("free", "설정된 스터디 프리셋이 없습니다.");
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
      place: preferInfo.place,
      subPlace: preferInfo.subPlace,
    }));
    naverMap.setCenter(
      createNaverMapDot(preferInfo.place.latitude, preferInfo.place.longitude)
    );
    setPrecision(2);
    setPreSet(type);
  };

  const navArr: ReturnDot[] = ["중앙", "서쪽", "동쪽", "북쪽"];

  const filterArr: ReturnDot[] = navArr.filter((dot) => {
    if (location === "양천" && dot === "북쪽") return false;
    if (location === "동대문" && dot === "동쪽") return false;
    if (location === "안양") return;
    if (location === "강남") return;
    return true;
  });

  const onClickSecond = () => {
    failToast("free", "2번 프리셋이 존재하지 않습니다.");
  };

  return (
    <>
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
      {isLoading && <MainLoadingAbsolute />}
      {isModal && <StudyQuickVoteRegisterModal setIsModal={setIsModal} />}
    </>
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
          as="div"
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
          as="div"
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
          as="div"
          mr="var(--margin-md)"
          onClick={() => setPrecision(1)}
        >
          1
        </Button>
        <Button
          onClick={() => setPrecision(2)}
          as="div"
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
