import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { POINT_SYSTEM_PLUS } from "../../../../constants/contentsValue/pointSystem";
import { LIKE_HEART } from "../../../../constants/keys/localStorage";
import { LIKE_HEART_PERIOD } from "../../../../constants/settingValue/localStorage";
import { pushArrToLocalStorage } from "../../../../helpers/storageHelpers";
import { useAdminAboutPointMutaion } from "../../../../hooks/admin/mutation";
import { useCompleteToast, useErrorToast } from "../../../../hooks/CustomToast";
import { useInteractionLikeMutation } from "../../../../hooks/interaction/mutations";
import { IInteractionLikeStorage } from "../../../../types/interaction";

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
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const { mutate: sendAboutPoint } = useAdminAboutPointMutaion(uid);

  const { mutate: sendHeart } = useInteractionLikeMutation({
    onSuccess() {
      completeToast("free", "좋아요 전송 완료");
    },
    onError: errorToast,
  });

  const isLikeRecord = (
    JSON.parse(localStorage.getItem(LIKE_HEART)) as IInteractionLikeStorage[]
  )?.find((who) => who.uid === uid);

  const isOverlap =
    isLikeRecord !== undefined &&
    dayjs().diff(dayjs(isLikeRecord?.date), "day") < LIKE_HEART_PERIOD;

  const onClick = () => {
    sendAboutPoint(POINT_SYSTEM_PLUS.like.point);
    pushArrToLocalStorage(LIKE_HEART, uid);
  };

  return (
    <Layout>
      <span>{name}</span>
      {isArrivedCondition && !isOverlap && (
        <HeartWrapper onClick={onClick}>
          <FontAwesomeIcon
            icon={faCircleHeart}
            color="var(--color-red)"
            flip={true}
            style={{ animationDuration: "2s" }}
          />
        </HeartWrapper>
      )}
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
const HeartWrapper = styled.div`
  margin-bottom: 3px;
  display: flex;
  align-items: center;
`;

export default StudySpaceUserCommentsName;
