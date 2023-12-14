import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/loaders/MainLoading";
import { useGroupStudyAllQuery } from "../../../hooks/groupStudy/queries";
import GroupStudyBottomNav from "../../../pagesComponents/groupStudy/detail/GroupStudyBottomNav";
import GroupStudyComments from "../../../pagesComponents/groupStudy/detail/GroupStudyComment";
import GroupStudyContent from "../../../pagesComponents/groupStudy/detail/GroupStudyContent/GroupStudyContent";
import GroupStudyCover from "../../../pagesComponents/groupStudy/detail/GroupStudyCover";
import GroupStudyHeader from "../../../pagesComponents/groupStudy/detail/GroupStudyHeader";
import GroupStudyParticipation from "../../../pagesComponents/groupStudy/detail/GroupStudyParticipation";
import GroupStudyTitle from "../../../pagesComponents/groupStudy/detail/GroupStudyTitle";
import { transferGroupStudyDataState } from "../../../recoil/transferDataAtoms";

function GroupStudyDetail() {
  const router = useRouter();
  const groupStudyId = router.query.id;

  const [groupStudy, setGroupStudy] = useRecoilState(
    transferGroupStudyDataState
  );

  const [isRefetch, setIsRefetch] = useState(false);

  const { refetch } = useGroupStudyAllQuery({
    enabled: !groupStudy,
    onSuccess(data) {
      setGroupStudy(data.find((item) => item.id === +groupStudyId));
    },
  });

  useEffect(() => {
    if (isRefetch || !groupStudy) {
      setTimeout(() => {
        refetch();
        setIsRefetch(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupStudy, isRefetch]);
  console.log(groupStudy);
  return (
    <>
      {groupStudy ? (
        <>
          <Layout>
            <GroupStudyHeader groupStudy={groupStudy} />
            <GroupStudyCover />
            <GroupStudyTitle
              memberCnt={groupStudy.participants.length + 1}
              title={groupStudy.title}
              status={groupStudy.status}
            />
            <GroupStudyContent groupStudy={groupStudy} />
            <GroupStudyParticipation data={groupStudy} />
            <GroupStudyComments comment={groupStudy.comment} />
            <GroupStudyBottomNav data={groupStudy} />
          </Layout>
          {/* {!isGuest && <GroupStudyBottomNav data={groupStudy} />} */}
        </>
      ) : (
        <MainLoading />
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  background-color: var(--font-h8);
`;

export default GroupStudyDetail;
