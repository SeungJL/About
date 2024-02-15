import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { UserIcon } from "../../../assets/icons/UserIcon";
import Skeleton from "../../../components/common/masks/skeleton/Skeleton";
import { IImageProps } from "../../../types2/assetTypes";
import { ITextAndColorType } from "../../../types2/propTypes";
import { IUserSummary } from "../../../types2/userTypes/userInfoTypes";
import AvatarGroupsOverwrap from "../groups/AvatarGroupsOverwrap";
export interface IPostThumbnailCard {
  participants: IUserSummary[];
  title: string;
  subtitle: string;
  image: IImageProps;
  url: string;
  badge: ITextAndColorType;
  statusText?: string;
}

interface IPostThumbnailCardObj {
  postThumbnailCardProps: IPostThumbnailCard;
}
export function PostThumbnailCard({
  postThumbnailCardProps: {
    participants,
    title,
    subtitle,
    image,
    url,
    badge,
    statusText = undefined,
  },
}: IPostThumbnailCardObj) {
  const userAvatarArr = participants.map((par) => ({
    image: par.profileImage,
    ...(par.avatar?.type !== null ? { avatar: par.avatar } : {}),
  }));

  return (
    <CardLink href={url}>
      <Image
        src={image.url}
        alt="thumbnailImage"
        priority={image.priority}
        width={86.5}
        height={86.5}
        style={{ borderRadius: "0.5rem" }}
      />
      <ContentContainer>
        <Title>
          <div className="title">{title}</div>
          {/* <OutlineBadge text={badge.text} colorType={badge.colorType} /> */}
        </Title>
        <Subtitle>{subtitle}</Subtitle>
        <StatusContainer>
          <AvatarGroupsOverwrap userAvatarArr={userAvatarArr} size="sm" />
          <div className="statusText">
            <div>{statusText}</div>
            <div className="userIconContainer">
              <UserIcon />
              <span>{participants.length}/8</span>
            </div>
          </div>
        </StatusContainer>
      </ContentContainer>
    </CardLink>
  );
}

export function PostThumbnailCardSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonBlock style={{ width: "86.5px", height: "86.5px" }}>
        <Skeleton>t</Skeleton>
      </SkeletonBlock>
      <ContentContainer>
        <Title style={{ marginBottom: "4px" }}>
          <div className="title">
            <Skeleton>temp</Skeleton>
          </div>
        </Title>
        <Subtitle>
          <Skeleton> temp</Skeleton>
        </Subtitle>
      </ContentContainer>
    </SkeletonContainer>
  );
}

const CardLink = styled(Link)`
  height: 110px;
  display: flex;
  padding: 12px;
  background-color: white;
  border: var(--border);
  border-radius: var(--rounded-lg);
  box-shadow: var(--shadow);
  &:hover {
    background-color: var(--gray-7); // gray-100
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 12px; // ml-3 수정
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  .title {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Subtitle = styled.div`
  color: var(--gray-3); // text-gray-500
  font-size: 13px;
`;

const StatusContainer = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  .statusText {
    display: flex;
    margin-left: auto;
    align-items: center;
    color: var(--gray-4); // text-gray-500
    .userIconContainer {
      display: flex;
      align-items: center;
      letter-spacing: 2px;
      > span:last-child {
        margin-left: 4px;
      }
    }
  }
`;

const SkeletonContainer = styled.div`
  height: 110px;
  display: flex;
  padding: 12px;
  background-color: white;

  border-radius: var(--rounded-lg);
  box-shadow: var(--shadow);
  &:hover {
    background-color: var(--gray-7); // gray-100
  }
`;

const SkeletonBlock = styled.div`
  background-color: var(--gray-200); // gray-200 대응
  border-radius: 0.5rem;
`;
