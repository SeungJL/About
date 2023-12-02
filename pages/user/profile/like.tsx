import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { useInteractionLikeQuery } from "../../../hooks/user/sub/interaction/queries";

function Like() {
  const { data: activeLogs } = useInteractionLikeQuery();
  return (
    <PageLayout>
      <Header title="좋아요 기록" isNoLine={true} url="/user/profile" />
      <Container>
        {activeLogs
          ?.slice()
          ?.reverse()
          ?.map((item, idx) => {
            const type = item.type;
            const [name, message] = item.message.split("님");

            return (
              <ItemContainer key={idx}>
                <span>
                  {dayjsToFormat(dayjs(item.createdAt), "YYYY년 M월 D일")}
                </span>
                <Item>
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
                </Item>
              </ItemContainer>
            );
          })}
      </Container>
    </PageLayout>
  );
}

const Layout = styled.div``;
const Container = styled.div``;
const AlphabetWrapper = styled.div`
  font-size: 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-sub) var(--padding-main);
  padding-bottom: var(--padding-md);
  border-bottom: 1px solid var(--font-h56);
  font-size: 13px;
  > span:first-child {
    font-size: 12px;
    color: var(--font-h2);
    margin-bottom: var(--margin-md);
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: var(--margin-md);
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

export default Like;
