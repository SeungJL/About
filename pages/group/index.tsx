import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Slide from "../../components/layout/PageSlide";
import RuleModal from "../../components/modals/RuleModal";
import CheckBoxNav from "../../components/templates/CheckBoxNav";
import Selector from "../../components2/atoms/Selector";
import Header from "../../components2/Header";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import TabNav, {
  ITabNavOptions,
} from "../../components2/molecules/navs/TabNav";
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
import { GroupCategory, IGroup } from "../../types/page/group";

interface ICategory {
  main: GroupCategory;
  sub: string | null;
}

function Index() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const categoryIdx = searchParams.get("category");
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [status, setStatus] = useState<"모집중" | "종료" | "모집 마감">(
    "모집중"
  );
  const [category, setCategory] = useState<ICategory>({
    main: categoryIdx !== null ? GROUP_STUDY_CATEGORY_ARR[categoryIdx] : "전체",
    sub: null,
  });

  const [groupStudies, setGroupStudies] = useState<IGroup[]>();
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const [isRuleModal, setIsRuleModal] = useState(false);

  const { data: groups, isLoading } = useGroupQuery();

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
    console.log(4, filtered, groups, category);
    setGroupStudies(shuffleArray(filtered));
  }, [category, groups, isGuest]);
  console.log(groupStudies);

  const mainTabOptionsArr: ITabNavOptions[] = GROUP_STUDY_CATEGORY_ARR.map(
    (category, idx) => ({
      text: category,
      func: () => {
        router.replace(`/group?category=${idx}`, { scroll: false });
        setCategory({
          main: GROUP_STUDY_CATEGORY_ARR[idx],
          sub: null,
        });
      },
    })
  );

  const StatusSelector = () => (
    <Selector
      defaultValue={status}
      setValue={setStatus}
      options={["모집중", "모집 마감", "종료"]}
    />
  );

  return (
    <>
      <Slide isFixed={true}>
        <Header title="소모임 그룹">
          <RuleIcon setIsModal={setIsRuleModal} />
        </Header>
      </Slide>
      <Slide>
        <Layout>
          <SectionBar title="내 소모임" hasMoreBtn={false} />
          {!groupStudies ? (
            <GroupSkeletonMine />
          ) : (
            <GroupMine myGroups={myGroups} />
          )}
          <SectionBar title="전체 소모임" rightComponent={<StatusSelector />} />
          <NavWrapper>
            <TabNav tabOptionsArr={mainTabOptionsArr} />
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
                  ?.map((group) => (
                    <GroupBlock group={group} key={group.id} />
                  ))}
              </Main>
            )}
          </>
        </Layout>
      </Slide>
      {!isGuest && <WritingIcon url="/group/writing/category/main" />}

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
  padding: 12px 16px;
`;

const SubNavWrapper = styled.div``;

const Main = styled.main`
  margin: var(--gap-4);
`;

export default Index;
