import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HeartLikeIcon from "../../../../components/common/Icon/HeartLikeIcon";
interface IstudyUserCommentsName {
  name: string;
  isArrivedCondition: boolean;
  uid: string;

  hasPublicAccess: boolean;
}

function studyUserCommentsName({
  uid,
  name,
  isArrivedCondition,
  hasPublicAccess,
}: IstudyUserCommentsName) {
  const { data: session } = useSession();

  const [isHeart, setIsHeart] = useState(false);

  useEffect(() => {
    if (isArrivedCondition && uid !== session?.user?.uid) {
      setIsHeart(true);
    } else setIsHeart(false);
  }, [isArrivedCondition, uid, session?.user?.uid]);

  return (
    <Layout>
      <span>{hasPublicAccess ? name : "비공개"}</span>
      {isHeart && <HeartLikeIcon toUid={uid} />}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  > span:first-child {
    color: var(--gray-1);
    font-weight: 600;
    margin-right: var(--gap-1);
  }
`;

export default studyUserCommentsName;
