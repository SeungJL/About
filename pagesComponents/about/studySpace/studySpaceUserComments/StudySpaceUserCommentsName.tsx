import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HeartLikeIcon from "../../../../components/common/Icon/HeartLikeIcon";
interface IStudySpaceUserCommentsName {
  name: string;
  isArrivedCondition: boolean;
  uid: string;
}

function StudySpaceUserCommentsName({
  uid,
  name,
  isArrivedCondition,
}: IStudySpaceUserCommentsName) {
  const { data: session } = useSession();

  const [isHeart, setIsHeart] = useState(false);

  useEffect(() => {
    if (isArrivedCondition && uid !== session?.uid) {
      setIsHeart(true);
    } else setIsHeart(false);
  }, [isArrivedCondition, uid, session?.uid]);

  return (
    <Layout>
      <span>{name}</span>
      {isHeart && <HeartLikeIcon toUid={uid} />}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 15px;
    margin-right: var(--margin-min);
  }
`;

export default StudySpaceUserCommentsName;
