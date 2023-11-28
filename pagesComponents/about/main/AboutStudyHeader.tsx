import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import LocationSelector from "../../../components/features/picker/LocationSelector";
import { myStudyState, studyDateStatusState } from "../../../recoil/studyAtoms";

function AboutStudyHeader() {
  const { data: session } = useSession();

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudyFixed = useRecoilValue(myStudyState);

  const [isCheck, setIsCheck] = useState<Boolean>(null);

  //출석체크 했는지 판단
  useEffect(() => {
    setIsCheck(null);
    if (!myStudyFixed) return;
    const myCheck = !!myStudyFixed?.attendences.find(
      (who) => who?.user?.uid === session?.uid
    )?.arrived;
    setIsCheck(!!myCheck);
  }, [myStudyFixed, myStudyFixed?.attendences, session?.uid, studyDateStatus]);

  return (
    <Layout>
      <Title>카공 스터디</Title>
      <LocationSelector />
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 var(--margin-main);
  padding-top: var(--padding-main);
  padding-bottom: var(--padding-sub);
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export default AboutStudyHeader;
