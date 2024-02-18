import styled from "styled-components";
import HighlightedTextButton from "../../atoms/buttons/HighlightedTextButton";

interface ISectionBar {
  title: string;
  hasMoreBtn?: boolean;
  rightComponent?: React.ReactNode;
  size?: "md" | "lg";
}
export default function SectionBar({
  title,
  hasMoreBtn = true,
  rightComponent,
  size = "lg",
}: ISectionBar) {
  return (
    <SectionBarContainer>
      <TitleContainer size={size}>{title}</TitleContainer>
      {hasMoreBtn && !rightComponent && <HighlightedTextButton text="더보기" />}
      {rightComponent}
    </SectionBarContainer>
  );
}

const SectionBarContainer = styled.div<{ size: "md" | "lg" }>`
  width: 100%;
  height: ${(props) => (props.size === "md" ? "51px " : "59px")};
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /* text-lg */
  font-weight: 600; /* font-semibold */
  background-color: white;
  border-top: var(--border);
  border-bottom: var(--border);
`;

const TitleContainer = styled.div<{ size: "md" | "lg" }>`
  font-size: ${(props) =>
    props.size === "lg" ? "18px" : "16px"}; /* text-lg */
  font-weight: ${(props) => (props.size === "lg" ? 700 : 600)};

  display: flex;
  align-items: center;
`;
