import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { useInteractionLikeQuery } from "../../hooks/interaction/queries";
import { InteractionType } from "../../types/interaction";

interface INoticeActive {
  type: InteractionType;
  from: string;
  message?: string;
}

function NoticeActive() {
  const { data: likeData } = useInteractionLikeQuery();
  return (
    <>
      {likeData?.map((item, idx) => (
        <Item key={idx}>
          <IconWrapper>
            <FontAwesomeIcon
              color="var(--color-red)"
              icon={faCircleHeart}
              size="xl"
            />
          </IconWrapper>
          <Content>
            <ContentUp>
              <span>하트 알림</span>
              <span>22-08-14</span>
            </ContentUp>
            <ContentDown>{item.message}</ContentDown>
          </Content>
        </Item>
      ))}
    </>
  );
}

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0 var(--padding-main);
`;

const IconWrapper = styled.div`
  margin-right: var(--margin-main);
`;

const Content = styled.div``;

const ContentUp = styled.div`
  margin-bottom: var(--margin-min);
  > span:first-child {
    margin-right: var(--margin-md);
  }
  > span:last-child {
    font-size: 12px;
    color: var(--font-h3);
  }
`;

const ContentDown = styled.div`
  font-size: 12px;
`;

export default NoticeActive;
