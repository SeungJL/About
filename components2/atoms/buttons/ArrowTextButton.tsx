import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// Styled button component
const StyledButton = styled.button`
  display: flex;
  align-items: center;
`;

// Styled div for the icon container to conditionally apply margin
const IconContainer = styled.div`
  margin-right: ${({ dir }) => (dir === "left" ? "0.25rem" : "0")};
  margin-left: ${({ dir }) => (dir === "right" ? "0.25rem" : "0")};
`;

const IconButton = ({ dir, text, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {dir === "left" && (
        <IconContainer dir={dir}>
          <FontAwesomeIcon icon={faChevronLeft} size="sm" />
        </IconContainer>
      )}
      {text}
      {dir === "right" && (
        <IconContainer dir={dir}>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </IconContainer>
      )}
    </StyledButton>
  );
};

export default IconButton;
