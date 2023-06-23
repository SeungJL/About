import {
  faCalendarDay,
  faInfinity,
  faUserCheck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";
import { GatherCategory, IGatherContent } from "../../types/gather";

function GatherBlock({
  data,
  category,
}: {
  data: IGatherContent;
  category: GatherCategory;
}) {
  const router = useRouter();
  const { data: user } = useUserInfoQuery();
  const setGatherData = useSetRecoilState(transferGatherDataState);

  const onClickBlock = () => {
    setGatherData(data);
    router.push(`/gather/${data?.id}`);
  };

  return (
    <>
      {data && (
        <Layout onClick={() => onClickBlock()}>
          <Header>
            <Status status={data?.status}>
              {data?.status === "pending"
                ? "모집중"
                : data?.status === "open"
                ? "오픈"
                : data?.status === "close"
                ? "취소"
                : null}
            </Status>
            ·<Category>{data?.type.title}</Category>·
            <Location>{data.location.main}</Location>
          </Header>
          <Title>{data.title}</Title>
          <Detail>
            <Condition>
              <FontAwesomeIcon icon={faUserCheck} color="var(--font-h4)" />
              <span>
                {data.age[0]}~{data.age[1]}세
              </span>
            </Condition>
            <Date>
              <FontAwesomeIcon icon={faCalendarDay} color="var(--font-h4)" />
              <span>{dayjs(data.date).format("M월 DD일")}</span>
            </Date>
          </Detail>
          <Participant>
            <Writer>
              <ProfileIcon user={data?.user} size="xs" />
              <span>{data?.user?.name}</span>
            </Writer>
            <Voter>
              <FontAwesomeIcon icon={faUserGroup} color="var(--font-h4)" />
              <span>{data?.participants?.length + 1} /</span>
              {data?.memberCnt.max ? (
                <span>{data?.memberCnt.max}</span>
              ) : (
                <>
                  <span />
                  <FontAwesomeIcon icon={faInfinity} color="var(--font-h2)" />
                </>
              )}
            </Voter>
          </Participant>
        </Layout>
      )}
    </>
  );
}

export default GatherBlock;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 2px solid var(--font-h6);
  padding: 14px;
`;

const Header = styled.header`
  font-size: 12px;
  color: var(--font-h3);
  display: flex;
  align-items: center;
`;

const Status = styled.span<{ status: string }>`
  color: ${(props) =>
    props?.status === "pending"
      ? " var(--color-mint)"
      : props?.status === "open"
      ? "var(--color-red)"
      : "var(--font-h4)"};
  margin-right: 4px;
  font-weight: 600;
`;

const Category = styled.span`
  margin: 0 4px;
`;

const Location = styled.span`
  margin-left: 4px;
`;

const Title = styled.div`
  margin: 6px 0;
  font-size: 15px;
  font-weight: 600;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 2;
`;

const Condition = styled.div`
  > span {
    margin-left: 8px;
  }
`;

const Date = styled.div`
  > span {
    margin-left: 12px;
  }
`;

const Participant = styled.div`
  margin-top: 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 6px;
  }
`;

const Voter = styled.div`
  display: flex;
  align-items: center;
  > span {
    color: var(--font-h2);
    font-weight: 600;

    margin-left: 3px;
  }
`;
