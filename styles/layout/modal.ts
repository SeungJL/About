import styled from "styled-components";

export const FullScreen = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
`;

export const ModalHeaderLine = styled.header`
  color: var(--font-h1);
  font-weight: 600;
  font-size: 16px;
  border-bottom: var(--border-sub);
  padding-bottom: var(--padding-sub);
`;

export const ModalMain = styled.main`
  margin: var(--margin-main) 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  color: var(--font-h2);
  font-size: 13px;
`;

export const ModalSubtitle = styled.div`
  font-weight: 600;
  margin-bottom: var(--margin-main);
  color: var(--font-h2);
  font-size: 13px;
`;

export const ModalFooterNav = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  > button {
    font-size: 14px;
    cursor: pointer;
  }
  > button:first-child {
    color: var(--font-h2);
    margin-right: 16px;
  }
  > button:last-child {
    color: var(--color-mint);
    margin-right: 3px;
    font-weight: 600;
  }
`;

export const ModalHeaderCenter = styled.header`
  text-align: center;
  padding-bottom: var(--padding-main);
  > span:first-child {
    font-size: 18px;
    font-weight: 600;
    color: var(--font-h1);
  }
  > div {
    margin-top: var(--margin-sub);
    font-size: 13px;
    color: var(--font-h2);
  }
`;
