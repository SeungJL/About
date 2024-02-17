import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Slide from "../../components/layout/PageSlide";
import RuleModal from "../../components/modals/RuleModal";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import CheckBoxNav from "../../components/templates/CheckBoxNav";
import Header from "../../components2/Header";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import {
  GROUP_STUDY_CATEGORY_ARR,
  GROUP_STUDY_RULE_CONTENT,
  GROUP_STUDY_SUB_CATEGORY,
} from "../../constants/contents/GroupStudyContents";
import { shuffleArray } from "../../helpers/utilHelpers";
import { useGroupQuery } from "../../hooks/groupStudy/queries";
import GroupBlock from "../../pageTemplates/group/GroupBlock";
import GroupMine from "../../pageTemplates/group/GroupMine";
import GroupSkeletonMain from "../../pageTemplates/group/GroupSkeletonMain";
import GroupSkeletonMine from "../../pageTemplates/group/GroupSkeletonMine";
import { GroupCategory, IGroup } from "../../types/page/Group";

interface ICategory {
  main: GroupCategory;
  sub: string | null;
}

function Index() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [category, setCategory] = useState<ICategory>({
    main: "전체",
    sub: null,
  });
  const [groupStudies, setGroupStudies] = useState<IGroup[]>();
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const [isRuleModal, setIsRuleModal] = useState(false);

  const { data: groups, isLoading } = useGroupQuery();
  console.log(groups);
  useEffect(() => {
    if (!groups) return;
    if (!isGuest) {
      setMyGroups(
        groups.filter((item) =>
          item.participants.some((who) => who.user.uid === session?.user.uid)
        )
      );
    }
    const filtered =
      category.main === "전체"
        ? groups
        : groups.filter(
            (item) =>
              (item.category.main === category.main && !category.sub) ||
              item.category.sub === category.sub
          );
    setGroupStudies(shuffleArray(filtered));
  }, [category, groups, isGuest]);

  return (
    <>
      <Slide isFixed={true}>
        <Header title="소모임 그룹">
          <RuleIcon setIsModal={setIsRuleModal} />
        </Header>
      </Slide>
      <Slide>
        <Layout>
          <SectionBar title="내 소모임" />
          {!groupStudies ? (
            <GroupSkeletonMine />
          ) : (
            <GroupMine myGroups={myGroups} />
          )}
          <SectionBar title="전체 소모임" />
          <NavWrapper>
            <ButtonCheckNav
              buttonList={[...GROUP_STUDY_CATEGORY_ARR]}
              selectedButton={category.main}
              setSelectedButton={(value: string) =>
                setCategory((old) => ({ ...old, sub: value }))
              }
              isLineBtn={true}
            />
          </NavWrapper>
          <SubNavWrapper>
            <CheckBoxNav
              buttonList={GROUP_STUDY_SUB_CATEGORY[category.main]}
              selectedButton={category.sub}
              setSelectedButton={(value: string) =>
                setCategory((old) => ({ ...old, sub: value }))
              }
            />
          </SubNavWrapper>
          <>
            {isLoading ? (
              <GroupSkeletonMain />
            ) : (
              <Main>
                {groupStudies
                  ?.slice()
                  ?.reverse()
                  ?.map((Group) => (
                    <GroupBlock Group={Group} key={Group.id} />
                  ))}
              </Main>
            )}
          </>
        </Layout>
      </Slide>
      {!isGuest && <WritingIcon url="/Group/writing/category/main" />}

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
