import { Button } from "@chakra-ui/react";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import { ActiveIcon } from "../../components/common/Icon/NoticeIcons";
import { NOTICE_ACTIVE_LOG } from "../../constants/keys/queryKeys";
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
        if (statusType === "refusal") completeToast("free", "거절하였습니다.");
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
          const alphabet = item?.sub?.split("/");

          return (
            <Item key={idx}>
              <IconWrapper>
                <ActiveIcon type={item.type} />
              </IconWrapper>
              <Name>
                {name}
                {type === "alphabet" && `(${alphabet[0]})`}
              </Name>
              <Content>
                님{message} {type === "like" && <Point>+2 point</Point>}
              </Content>
              {type === "alphabet" && (
                <AlphabetWrapper style={{ marginRight: "var(--margin-md)" }}>
                  <AlphabetIcon
                    alphabet={alphabet[0] as Alphabet}
                    isCircle={true}
                  />
                  <span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
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
                      border="1px solid var(--color-mint)"
                      borderRadius="11px"
                      fontSize="12px"
                      fontWeight="700"
                      mr="var(--margin-md)"
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
                      fontSize="12px"
                      border="1px solid var(--font-h2)"
                      borderRadius="11px"
                      size="xs"
                      color="var(--font-h2)"
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
  display: flex;
  align-items: center;
  font-size: 8px;

  > span {
    margin: 0 var(--margin-min);
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: var(--padding-sub) var(--padding-max);
  font-size: 13px;
  border-bottom: 1px solid var(--font-h56);
`;

const IconWrapper = styled.div`
  margin-right: var(--margin-md);
`;

const Name = styled.div`
  font-weight: 600;
  white-space: nowrap;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: 22px;
  margin-right: var(--margin-md);
`;

const Point = styled.span`
  margin-left: var(--margin-min);
  color: var(--color-mint);
  font-size: 12px;
  font-weight: 600;
`;

const Date = styled.span`
  margin-left: auto;
  white-space: nowrap;
  color: var(--font-h3);
  font-size: 11px;
`;

const FriendButtons = styled.div`
  margin-left: auto;
  display: flex;
`;

const FriendComplete = styled.span`
  margin-left: auto;
  color: var(--font-h3);
  font-weight: 500;
  font-size: 12px;
`;

export default NoticeActive;
