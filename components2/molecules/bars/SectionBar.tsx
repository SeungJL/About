import styled from "styled-components";

interface ISectionBar {
  title: string;
  rightComponent?: React.ReactNode;
}
export default function SectionBar({ title, rightComponent }: ISectionBar) {
  return (
    <SectionBarContainer>
      <TitleContainer>{title}</TitleContainer>
      {rightComponent}
    </SectionBarContainer>
  );
}

const SectionBarContainer = styled.div`
  height: 3.5rem; /* 14px */
  padding: 0 1rem; /* 4px */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  background-color: white;
`;

const TitleContainer = styled.div`
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  display: flex;
  align-items: center;
`;
