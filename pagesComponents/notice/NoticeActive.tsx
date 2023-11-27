import { Button } from "@chakra-ui/react";
import {
  faCircleHeart,
  faFaceThinking,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import { NOTICE_ACTIVE_LOG } from "../../constants/keys/queryKeys";
import { TABLE_COLORS } from "../../constants/styles";
import { getDateDiff } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/custom/CustomToast";
import { useUserFriendMutation } from "../../hooks/user/mutations";
import { useCollectionAlphabetMutation } from "../../hooks/user/sub/collection/mutations";
import { useInteractionMutation } from "../../hooks/user/sub/interaction/mutations";
import { userInfoState } from "../../recoil/userAtoms";
import { INoticeActiveLog } from "../../types/interaction";
import { Alphabet } from "../../types/user/collections";

interface INoticeActive {
  activeLogs: INoticeActiveLog[];
}

function NoticeActive({ activeLogs }: INoticeActive) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const failToast = useFailToast();
  let statusType: "approval" | "refusal" | "response";

  const resetQueryData = useResetQueryData();

  const userInfo = useRecoilValue(userInfoState);
  const { mutate: registerFriend } = useUserFriendMutation("patch", {
    onError: errorToast,
  });
  const { mutate: changeAlphabet, data } =
    useCollectionAlphabetMutation("change");

  const { mutate: interactionFriend } = useInteractionMutation(
    "friend",
    "patch",
    {
      onSuccess() {
        if (statusType === "approval") completeToast("free", "수락 완료 !");
        if (statusType === "refusal") failToast("free", "거절하였습니다.");
        statusType = null;
        resetQueryData([NOTICE_ACTIVE_LOG]);
      },
    }
  );
  const { mutate: interactionAlphabet } = useInteractionMutation(
    "alphabet",
    "patch",
    {
      onSuccess() {
        if (statusType === "approval") completeToast("free", "수락 완료 !");
        if (statusType === "refusal") failToast("free", "거절하였습니다.");
        statusType = null;
        resetQueryData([NOTICE_ACTIVE_LOG]);
      },
    }
  );

  const onClickFriendRequest = async (
    type: "friend" | "alphabet",
    status: "approval" | "refusal",
    from: string,
    alphabet?: Alphabet[]
  ) => {
    statusType = status;
    if (type === "friend") {
      if (status === "approval") await registerFriend(from);
      await interactionFriend({ from, status });
    }
    if (type === "alphabet") {
      if (status === "approval") {
        await changeAlphabet({
          mine: alphabet[1],
          opponent: alphabet[0],
          myId: userInfo._id,
          toUid: from,
        });
      }
      await interactionAlphabet({ from, status });
    }
  };

  return (
    <>
      {activeLogs
        ?.slice()
        ?.reverse()
        ?.map((item, idx) => {
          const type = item.type;
          const [name, message] = item.message.split("님");
          if (type === "alphabet") console.log(item);
          const alphabet = item?.sub?.split("/");
          if (type === "alphabet") console.log(item);
          return (
            <Item key={idx}>
              <IconWrapper>
                {type === "like" ? (
                  <FontAwesomeIcon
                    color="var(--color-red)"
                    icon={faCircleHeart}
                    size="xl"
                  />
                ) : type === "friend" ? (
                  <FontAwesomeIcon
                    icon={faFaceThinking}
                    size="xl"
                    color={TABLE_COLORS[3]}
                  />
                ) : (
                  <AlphabetWrapper>
                    <AlphabetIcon
                      alphabet={alphabet[0] as Alphabet}
                      isCircle={true}
                    />
                  </AlphabetWrapper>
                )}
              </IconWrapper>
              <Name>{name}</Name>
              <Content>
                님{message} {type === "like" && <Point>+2 point</Point>}
              </Content>
              {type === "alphabet" && (
                <AlphabetWrapper style={{ marginRight: "var(--margin-md)" }}>
                  <AlphabetIcon
                    alphabet={alphabet[1] as Alphabet}
                    isCircle={true}
                  />
                </AlphabetWrapper>
              )}
              {type === "friend" || type === "alphabet" ? (
                item.status === "pending" ? (
                  <FriendButtons>
                    <Button
                      mx="var(--margin-min)"
                      size="xs"
                      fontSize="11px"
                      variant="ghost"
                      color="var(--color-mint)"
                      onClick={() =>
                        onClickFriendRequest(
                          type,
                          "approval",
                          item.from,
                          type === "alphabet" && (alphabet as Alphabet[])
                        )
                      }
                    >
                      수락
                    </Button>
                    <Button
                      fontSize="11px"
                      size="xs"
                      variant="ghost"
                      onClick={() =>
                        onClickFriendRequest(
                          type,
                          "refusal",
                          item.from,
                          type === "alphabet" && (alphabet as Alphabet[])
                        )
                      }
                    >
                      거절
                    </Button>
                  </FriendButtons>
                ) : item.status === "response" ? (
                  <Date>
                    {item?.createdAt && getDateDiff(dayjs(item.createdAt))}
                  </Date>
                ) : (
                  <FriendComplete>
                    {item.status === "approval" ? "수락 완료" : "거절 완료"}
                  </FriendComplete>
                )
              ) : (
                <Date>
                  {item?.createdAt && getDateDiff(dayjs(item.createdAt))}
                </Date>
              )}
            </Item>
          );
        })}
    </>
  );
}

const AlphabetWrapper = styled.div`
  font-size: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: var(--padding-sub) var(--padding-main);
  font-size: 13px;
  border-bottom: 1px solid var(--font-h56);
`;

const IconWrapper = styled.div`
  margin-right: var(--margin-main);
`;

const Name = styled.div`
  height: 22px;
  font-weight: 600;
  white-space: nowrap;
`;

const Content = styled.span`
  white-space: nowrap;
  height: 22px;
  margin-right: var(--margin-md);
`;

const Point = styled.span`
  color: var(--color-mint);
  font-size: 10px;
`;

const Date = styled.span`
  white-space: nowrap;
  color: var(--font-h3);
  font-size: 11px;
`;

const FriendButtons = styled.div`
  display: flex;
`;

const FriendComplete = styled.span`
  color: var(--font-h3);
  font-size: 11px;
`;

export default NoticeActive;
