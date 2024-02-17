import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Header from "../../components/layout/Header";
import RuleModal from "../../components/modals/RuleModal";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import CheckBoxNav from "../../components/templates/CheckBoxNav";
import {
  GROUP_STUDY_CATEGORY_ARR,
  GROUP_STUDY_RULE_CONTENT,
  GROUP_STUDY_SUB_CATEGORY,
} from "../../constants/contents/GroupStudyContents";
import { shuffleArray } from "../../helpers/utilHelpers";
import { useGroupStudyAllQuery } from "../../hooks/groupStudy/queries";
import { useUserInfoQuery } from "../../hooks/user/queries";
import GroupStudyBlock from "../../pageTemplates/groupStudy/GroupBlock";
import GroupStudyMine from "../../pageTemplates/groupStudy/GroupMine";
import GroupStudySkeletonMain from "../../pageTemplates/groupStudy/GroupSkeletonMain";
import GroupStudySkeletonMine from "../../pageTemplates/groupStudy/GroupSkeletonMine";
import { isGuestState, userInfoState } from "../../recoil/userAtoms";
import { IGroupStudy } from "../../types/page/groupStudy";

function Index() {
  const isGuest = useRecoilValue(isGuestState);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useUserInfoQuery({
    enabled: !userInfo,
    onSuccess(data) {
      setUserInfo(data);
    },
  });

  const [groupStudies, setGroupStudies] = useState<IGroupStudy[]>();
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState();
  const [myStudies, setMyStudies] = useState([]);

  const [isRuleModal, setIsRuleModal] = useState(false);

  const { data: groupStudyAll, isLoading } = useGroupStudyAllQuery();

  useEffect(() => {
    if (isLoading || (!userInfo && !isGuest)) return;

    if (!isGuest) {
      setMyStudies(
        groupStudyAll.filter((item) =>
          item.participants.some((who) => who.user.uid === userInfo.uid)
        )
      );
    }

    const filtered =
      category === "전체"
        ? groupStudyAll
        : groupStudyAll.filter(
            (item) =>
              (item.category.main === category && !subCategory) ||
              item.category.sub === subCategory
          );
    setGroupStudies(shuffleArray(filtered));
  }, [category, groupStudyAll, isGuest, isLoading, subCategory, userInfo]);

  return (
    <>
      <Layout>
        <Header title="소모임 그룹">
          <RuleIcon setIsModal={setIsRuleModal} />
        </Header>{" "}
        <Title>내 소모임</Title>
        {!groupStudies ? (
          <GroupStudySkeletonMine />
        ) : (
          <GroupStudyMine myStudies={myStudies} />
        )}
        <Title>전체 소모임</Title>
        <NavWrapper>
          <ButtonCheckNav
            buttonList={["전체", ...GROUP_STUDY_CATEGORY_ARR]}
            selectedButton={category}
            setSelectedButton={setCategory}
            isLineBtn={true}
          />
        </NavWrapper>
        <SubNavWrapper>
          <CheckBoxNav
            buttonList={GROUP_STUDY_SUB_CATEGORY[category]}
            selectedButton={subCategory}
            setSelectedButton={setSubCategory}
          />
        </SubNavWrapper>
        <>
          {isLoading ? (
            <GroupStudySkeletonMain />
          ) : (
            <Main>
              {groupStudies
                ?.slice()
                ?.reverse()
                ?.map((groupStudy) => (
                  <GroupStudyBlock
                    groupStudy={groupStudy}
                    key={groupStudy.id}
                  />
                ))}
            </Main>
          )}
        </>
      </Layout>
      {!isGuest && <WritingIcon url="/groupStudy/writing/category/main" />}

      {isRuleModal && (
        <RuleModal
          content={GROUP_STUDY_RULE_CONTENT}
          setIsModal={setIsRuleModal}
        />
      )}
    </>
  );
}
const Title = styled.div`
  background-color: white;
  padding: var(--gap-4);
  font-weight: 600;
  font-size: 18px;
`;
const Layout = styled.div`
  min-height: 100vh;
  background-color: var(--gray-8);
`;

const NavWrapper = styled.div`
  padding: var(--gap-3) var(--gap-4);
  padding-bottom: 0;
`;

const SubNavWrapper = styled.div``;

const Main = styled.main`
  margin: var(--gap-4);
`;

export default Index;
