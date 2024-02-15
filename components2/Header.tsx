import styled from "styled-components";
import ArrowBackButton from "./atoms/buttons/ArrowBackButton";
interface IHeader {
  title: string;
  url?: string;
  children?: React.ReactNode;
}

export default function Header({ title, url, children }: IHeader) {
  return (
    <HeaderContainer>
      <LeftSection>
        <ArrowBackButton url={url} />
        <Title>{title}</Title>
      </LeftSection>
      <div>{children}</div>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.header`
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;

  height: var(--header-h);
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
`;

// Left Section 스타일
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// Title 스타일
const Title = styled.div`
  margin-left: 4px; /* ml-1 */
  font-weight: 800; /* font-extrabold */
  color: var(--gray-1); /* text-gray-1 - 색상은 예시입니다 */
`;
