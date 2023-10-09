import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { IInteractionGetLike } from "../../types/interaction";

interface INoticeActive {
  likeData: IInteractionGetLike[];
}

function NoticeActive({ likeData }: INoticeActive) {
  console.log(likeData);
  return (
    <>
      {likeData
        ?.slice()
        ?.reverse()
        ?.map((item, idx) => {
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
              <Content>님{message}</Content>
              {/* <Date>1일 전</Date> */}
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

const Name = styled.span`
  font-weight: 600;
`;

const Content = styled.span`
  margin-right: var(--margin-md);
`;

const Date = styled.span`
  color: var(--font-h3);
  font-size: 11px;
`;

export default NoticeActive;
