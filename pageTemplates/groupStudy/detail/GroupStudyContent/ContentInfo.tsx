import { faBellOn } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BlurredPart from "../../../../components/common/masks/BlurredPart";
import { userInfoState } from "../../../../recoil/userAtoms";
import { IGroupStudy } from "../../../../types/page/groupStudy";
import GroupStudyDetailInfo from "../GroupStudyDetail";

interface IContentInfo {
  groupStudy: IGroupStudy;
}

function ContentInfo({ groupStudy }: IContentInfo) {
  const hashTagText = groupStudy.hashTag;
  const hashTagArr = hashTagText?.split("#");
  const userInfo = useRecoilValue(userInfoState);

  const isMember = groupStudy?.participants?.some(
    (who) => who.user.uid === userInfo?.uid
  );

  return (
    <Layout>
      <Wrapper>
        <GroupStudyDetailInfo groupStudy={groupStudy} />
      </Wrapper>
      <ContentWrapper>
        <span>소개</span>
        <Content>{groupStudy.content}</Content>
      </ContentWrapper>
      {!!groupStudy?.rules?.length && (
        <ContentWrapper>
          <span>규칙</span>
          <Rules>
            {groupStudy?.rules.map((rule, idx) => (
              <Rule key={idx}>{rule}</Rule>
            ))}
          </Rules>
        </ContentWrapper>
      )}
      {groupStudy?.link && (
        <KakaoLink>
          <span>오픈채팅방 주소(참여 인원 전용)</span>
          <div>
            <BlurredPart isBlur={!isMember} isCenter={false}>
              <Link href={groupStudy.link}>
                <a
                  onClick={(e) => {
                    if (!isMember) e.preventDefault();
                  }}
                >
                  {groupStudy?.link}
                </a>
              </Link>
            </BlurredPart>
          </div>
        </KakaoLink>
      )}
      {groupStudy?.challenge && (
        <Challenge>
          <FontAwesomeIcon icon={faBellOn} color="var(--color-red)" />
          {groupStudy?.challenge}
        </Challenge>
      )}
      <Tag>
        {hashTagArr?.map((tag, idx) =>
          tag ? <div key={idx}>#{tag}</div> : null
        )}
      </Tag>
    </Layout>
  );
}

const KakaoLink = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--gap-2) var(--gap-3);
  padding-bottom: var(--gap-1);
  background-color: var(--gray-8);

  > div {
    padding: var(--gap-1) 0;
  }
`;

const Challenge = styled.div`
  padding: var(--gap-2) var(--gap-3);
  background-color: var(--gray-8);
  > svg {
    margin-right: var(--gap-2);
  }
`;

const Rules = styled.ol``;

const Rule = styled.li`
  margin-left: var(--gap-3);
  margin-bottom: 4px;
`;

const Wrapper = styled.div`
  padding: var(--gap-4);
  background-color: var(--gray-8);
`;

const Layout = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: var(--gap-4);
  flex: 1;

  display: flex;
  flex-direction: column;

  > span:first-child {
    display: inline-block;
    font-size: 16px;
    margin-bottom: var(--gap-3);
    font-weight: 700;
  }
`;

const Content = styled.pre`
  font-size: 14px;
  font-family: apple;
  white-space: pre-wrap;
  flex: 1;
`;

const Tag = styled.div`
  display: flex;
  margin-top: auto;
  padding: var(--gap-3) var(--gap-4);
  > div {
    padding: var(--gap-1) var(--gap-2);
  }
`;

export default ContentInfo;
