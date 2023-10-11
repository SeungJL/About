import styled from "styled-components";

export const InputSm = styled.input`
  flex: 1;
  width: 100%;
  background-color: var(--font-h56);
  border-radius: var(--border-radius-sub);
  padding: var(--padding-sub);
  &:focus {
    outline: none;
  }
`;

export const InputLg = styled.input`
  height: 48px;
  width: 100%;
  border: var(--border-main);
  border-radius: var(--border-radius-sub);
  padding: var(--padding-sub);
  &:focus {
    outline-color: var(--font-h1);
  }
  ::placeholder {
    color: var(--font-h4);
  }
`;
