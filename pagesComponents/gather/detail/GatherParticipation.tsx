import {
  fa1,
  fa2,
  faCrown,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { IGatherContent } from "../../../types/page/gather";
import { IUser } from "../../../types/user/user";

interface IGatherParticipation {
  data: IGatherContent;
}

function GatherParticipation({ data }: IGatherParticipation) {
  const router = useRouter();
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const organizer = data.user;
  const status = data?.status;
  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <Layout>
      <span>
        {status === "open" ? "확정 인원" : "참여중인 인원"} &nbsp;
        <span>{data?.participants.length + 1} /</span>
        {data?.memberCnt.max ? (
          <span> {data?.memberCnt.max}</span>
        ) : (
          <>
            <span style={{ marginLeft: "4px" }} />
            <FontAwesomeIcon icon={faInfinity} color="var(--font-h2)" />
          </>
        )}
      </span>

      <div>
        <MemberItem
          key={organizer?.uid}
          onClick={() => onClickProfile(organizer)}
        >
          <Organizer>
            <ProfileIcon user={organizer} size="md" />
            <CrownWrapper>
              <FontAwesomeIcon
                icon={faCrown}
                color="var(--color-orange)"
                size="lg"
              />
            </CrownWrapper>
          </Organizer>
          <UserOverview>
            <span>{organizer?.name}</span>
            <span>{organizer?.comment}</span>
          </UserOverview>
        </MemberItem>
        {data?.participants.map((who) => (
          <MemberItem
            key={who?.user.uid}
            onClick={() => onClickProfile(who.user)}
          >
            <ProfileIcon user={who.user} size="md" />
            <UserOverview>
              <span>{who?.user.name}</span>
              <span>{who?.user.comment}</span>
            </UserOverview>
            <ParticipateTime isFirst={who?.phase === "first"}>
              {who?.phase === "first" ? (
                <FontAwesomeIcon icon={fa1} />
              ) : (
                <FontAwesomeIcon icon={fa2} />
              )}
              <span>차</span>
            </ParticipateTime>
          </MemberItem>
        ))}
      </div>
    </Layout>
  );
}
const MemberItem = styled.div`
  margin-bottom: var(--margin-main);
  display: flex;
  align-items: center;
`;

const UserOverview = styled.div`
  display: flex;
  flex-direction: column;
  line-height: var(--line-height);
  margin-left: var(--margin-md);
  > span:first-child {
    font-size: 13px;
    font-weight: 600;
  }
  > span:last-child {
    font-size: 12px;
    color: var(--font-h3);
  }
`;
const Organizer = styled.div`
  position: relative;
`;

const ParticipateTime = styled.div<{ isFirst: boolean }>`
  margin-left: auto;
  margin-right: var(--margin-md);
  color: ${(props) =>
    props.isFirst ? "var(--color-mint)" : "var(--color-orange)"};
  > span:last-child {
    margin-left: var(--margin-min);
  }
`;

const CrownWrapper = styled.div`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;
const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: var(--margin-max) 0;
  > span:first-child {
    margin-right: auto;
    font-weight: 700;
    text-align: start;
    > span {
      color: var(--color-mint);
    }
  }
  > div {
    margin-top: var(--margin-max);
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default GatherParticipation;
