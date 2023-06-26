import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

function RecordNavigation({
  isCalendar,
  setIsCalendar,
}: {
  isCalendar: boolean;
  setIsCalendar: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <Button isSelected={isCalendar} onClick={() => setIsCalendar(true)}>
        달력
      </Button>
      <Button isSelected={!isCalendar} onClick={() => setIsCalendar(false)}>
        상세
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 347px;
  margin: 0 14px;
  height: 40px;
  padding: 4px;
  border-radius: 24px;
  background-color: var(--font-h6);
  bottom: 20px;
  color: var(--font-h3);
  font-weight: 600;
`;

const Button = styled.button<{ isSelected: boolean }>`
  height: 100%;
  flex: 1;
  border-radius: 24px;
  font-size: 15px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-mint)" : null};
  color: ${(props) => (props.isSelected ? "white" : null)};
  font-weight: ${(props) => (props.isSelected ? "600" : null)};
`;

export default RecordNavigation;
