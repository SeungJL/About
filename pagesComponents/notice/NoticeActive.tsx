import { Button } from "@chakra-ui/react";
import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { NOTICE_ACTIVE_LOG } from "../../constants/keys/queryKeys";
import { getDateDiff } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/custom/CustomToast";
import { useUserFriendMutation } from "../../hooks/user/mutations";
import { useInteractionMutation } from "../../hooks/user/sub/interaction/mutations";

import { INoticeActiveLog } from "../../types/interaction";

interface INoticeActive {
  activeLogs: INoticeActiveLog[];
}

function NoticeActive({ activeLogs }: INoticeActive) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const failToast = useFailToast();
  let type: "approval" | "refusal" | "response";

  const resetQueryData = useResetQueryData();

  const { mutate: registerFriend } = useUserFriendMutation("patch", {
    onError: errorToast,
  });

  const { mutate } = useInteractionMutation("friend", "patch", {
    onSuccess() {
      if (type === "approval") completeToast("free", "수락 완료 !");
      if (type === "refusal") failToast("free", "거절하였습니다.");
      type = null;
      resetQueryData([NOTICE_ACTIVE_LOG]);
    },
  });

  const onClickFriendRequest = async (
    status: "approval" | "refusal",
    from: string
  ) => {
    type = status;
    await registerFriend(from);
    await mutate({ from, status });
  };

  return (
    <>
      {activeLogs
        ?.slice()
        ?.reverse()
        ?.map((item, idx) => {
          const type = item.type;
          const [name, message] = item.message.split("님");
          return (
            <Item key={idx}>
              <IconWrapper>
                <FontAwesomeIcon
                  color="var(--color-red)"
                  icon={faCircleHeart}
                  size="xl"
                />
              </IconWrapper>
              <Name>{name}</Name>
              <Content>
                님{message} {type === "like" && <Point>+2 point</Point>}
              </Content>

              {type === "friend" ? (
                item.status === "pending" ? (
                  <FriendButtons>
                    <Button
                      mx="var(--margin-min)"
                      size="xs"
                      fontSize="11px"
                      variant="ghost"
                      color="var(--color-mint)"
                      onClick={() =>
                        onClickFriendRequest("approval", item.from)
                      }
                    >
                      수락
                    </Button>
                    <Button
                      fontSize="11px"
                      size="xs"
                      variant="ghost"
                      onClick={() => onClickFriendRequest("refusal", item.from)}
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
