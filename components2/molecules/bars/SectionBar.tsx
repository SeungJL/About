import styled from "styled-components";
import HighlightedTextButton from "../../atoms/buttons/HighlightedTextButton";

interface ISectionBar {
  title: string;
  hasMoreBtn?: boolean;
  rightComponent?: React.ReactNode;
}
export default function SectionBar({
  title,
  hasMoreBtn = true,
  rightComponent
}: ISectionBar) {
  return (
    <SectionBarContainer>
      <TitleContainer>{title}</TitleContainer>
      {hasMoreBtn && !rightComponent && <HighlightedTextButton text="더보기" />}
      {rightComponent}
    </SectionBarContainer>
  );
}

const SectionBarContainer = styled.div`
  padding: 16px; /* 4px */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /* text-lg */
  font-weight: 600; /* font-semibold */
  background-color: white;
  border-top: var(--border);
  border-bottom: var(--border);
`;

const TitleContainer = styled.div`
  font-size: 18px; /* text-lg */
  font-weight: 700; /* font-semibold */
  display: flex;
  align-items: center;
`;
