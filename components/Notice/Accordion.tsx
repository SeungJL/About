import React from "react";
import styled from "styled-components";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  contents?: any;
  category: string;
  title: string;
  date: string;
};

function Accordion(props: Props) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const category = props.category;
  const handleButtonClick = React.useCallback(
    (event: any) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        parentRef.current.style.background = "none";
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        parentRef.current.style.background = "none";
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonText =
    parentRefHeight === "0px" ? (
      <FontAwesomeIcon icon={faArrowDown} size="sm" />
    ) : (
      <FontAwesomeIcon icon={faArrowUp} size="sm" />
    );

  return (
    <Container>
      <Header onClick={handleButtonClick}>
        <span>{props.date}</span>
        <span>{props.title}</span>
        <Button>{buttonText}</Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid RGB(113, 85, 63);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  height: 40px;
  margin: 0 32px 0 8px;
  > span:first-child {
    margin-right: 10px;
    font-size: 13px;
    color: brown;
  }
`;

const Button = styled.div`
  top: 8px;
  right: 8px;
  font-size: 14px;
  position: absolute;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

const Contents = styled.div`
  font-size: 14px;
  padding: 0.1px;
  padding-bottom: 6px;
`;

export default React.memo(Accordion);
