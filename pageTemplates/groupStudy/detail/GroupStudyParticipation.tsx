import { faCrown, faInfinity } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { GROUP_STUDY_ROLE } from "../../../constants/settingValue/groupStudy";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { IGroupStudy } from "../../../types/page/groupStudy";
import { IUser } from "../../../types/user/user";

interface IGroupStudyParticipation {
  data: IGroupStudy;
}

function GroupStudyParticipation({ data }: IGroupStudyParticipation) {
  const router = useRouter();
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const organizer = data.organizer;
  const status = data.status;
  const participantsCnt = data.participants.length;

  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <Layout>
      <Header>
        <span>{status === "open" ? "확정 인원" : "참여중인 인원"}</span>
        <span>{participantsCnt}</span>
        <span>/</span>
        {data?.memberCnt.max ? (
          <span>{data?.memberCnt.max}</span>
        ) : (
          <>
            <span style={{ marginLeft: "4px" }} />
            <FontAwesomeIcon icon={faInfinity} color="var(--gray-2)" />
          </>
        )}
      </Header>
      <Members>
        {data?.participants.map(
          (who) =>
            who && (
              <MemberItem
                key={who?.user?.uid}
                onClick={() => onClickProfile(who?.user)}
              >
                <ProfileWrapper>
                  <ProfileIcon user={who?.user} size="sm" />
                  {who?.role === "admin" && (
                    <Crown>
                      <FontAwesomeIcon
                        icon={faCrown}
                        color="var(--color-orange)"
                      />
                    </Crown>
                  )}
                </ProfileWrapper>
                <UserOverview>
                  <span>{who?.user?.name}</span>
                  <div>{who?.user?.comment}</div>
                </UserOverview>
                <ParticipateTime isFirst={true}>
                  {GROUP_STUDY_ROLE[who.role]}
                </ParticipateTime>
              </MemberItem>
            )
        )}
      </Members>
    </Layout>
  );
}

const ProfileWrapper = styled.div`
  position: relative;
`;

const Crown = styled.div`
  position: absolute;
  right: -2px;
  bottom: -2px;
`;

const MemberItem = styled.div`
  padding: var(--gap-2) 0;
  display: flex;
  align-items: center;

  border-bottom: var(--border-light);
`;

const Header = styled.header`
  font-size: 16px;
  padding: var(--gap-4);
  font-weight: 600;

  > span:first-child {
    margin-right: var(--gap-3);
  }
  > span:nth-child(2) {
    font-weight: 700;
    color: var(--color-mint);
  }
  > span:nth-child(3) {
    margin: 0 var(--gap-1);
  }
`;

const Members = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--gap-4);
  > div:last-child {
    border: none;
  }
`;

const UserOverview = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  margin-left: var(--gap-3);
  > span:first-child {
    font-size: 14px;
    font-weight: 600;
  }
  > div:last-child {
    width: 95%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 13px;
    color: var(--gray-2);
  }
`;
const Organizer = styled.div`
  position: relative;
`;

const ParticipateTime = styled.div<{ isFirst: boolean }>`
  font-size: 16px;
  margin-left: auto;
  margin-right: var(--gap-2);
  color: ${(props) =>
    props.isFirst ? "var(--color-mint)" : "var(--color-orange)"};
  > span:last-child {
    margin-left: 2px;
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
  background-color: white;
  padding-bottom: var(--gap-4);
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  > span {
    font-size: 18px;
    color: var(--gray-4);
  }
`;

export default GroupStudyParticipation;
