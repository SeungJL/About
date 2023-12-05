import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { GATHER_RANDOM_MAIN } from "../../../../../constants/image/imageUrl";
import { dayjsToFormat } from "../../../../../helpers/dateHelpers";
import { prevPageUrlState } from "../../../../../recoil/previousAtoms";
import { transferGatherDataState } from "../../../../../recoil/transferDataAtoms";
import { IGather } from "../../../../../types/page/gather";
import GatherBlockParticipants from "./AboutGatherBlockParticipants";
import GatherBlockStatus from "./AboutGatherBlockStatus";

interface IAboutGatherBlock {
  gather: IGather;
  isMyResult?: boolean;
  isImagePriority?: boolean;
}

function AboutGatherBlock({ gather, isImagePriority }: IAboutGatherBlock) {
  const router = useRouter();

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);
  const setGatherData = useSetRecoilState(transferGatherDataState);

  const [randomImage, setRandomImage] = useState<string>();

  const onClickItem = () => {
    setPrevPageUrl(router.asPath);
    setGatherData(gather);
    router.push(`/gather/${gather.id}`);
  };

  useEffect(() => {
    setRandomImage(
      GATHER_RANDOM_MAIN[Math.floor(Math.random() * GATHER_RANDOM_MAIN.length)]
    );
  }, []);

  const participants = gather?.participants?.map((who) => who.user);

  return (
    <Layout onClick={onClickItem}>
      {gather && (
        <>
          <ImageContainer>
            {randomImage && (
              <Image
                src={gather?.image || randomImage}
                layout="fill"
                alt="gatherImage"
                priority={isImagePriority}
              />
            )}
          </ImageContainer>
          <SpaceInfo>
            <GatherBlockStatus title={gather.title} status={gather.status} />
            <Info>
              {gather.place} {" · "}
              {gather.type.title}
              {" · "}
              {dayjsToFormat(dayjs(gather.date), "M월 D일(ddd) ")}
            </Info>
            <GatherBlockParticipants
              participants={[gather.user, ...participants]}
              status={gather.status}
              maxCnt={gather.memberCnt.max}
            />
          </SpaceInfo>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.button`
  width: 100%;
  height: 110px;
  background-color: white;
  box-shadow: var(--box-shadow-b);
  border-radius: var(--border-radius2);
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-main);
  padding: var(--padding-sub);
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1/1;
  border: var(--border-sub);
  border-radius: var(--border-radius2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SpaceInfo = styled.div`
  margin-left: var(--margin-sub);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  color: var(--font-h3);
  font-size: 13px;
`;

export default AboutGatherBlock;
