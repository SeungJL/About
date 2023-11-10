import styled from "styled-components";

export const FullScreen = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 20;
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

interface IModalSubTitle {
  isLight?: boolean;
}

export const ModalSubtitle = styled.div<IModalSubTitle>`
  font-weight: ${(props) => (props.isLight ? "400" : "600")};
  margin-bottom: var(--margin-sub);
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
    font-weight: 600;
    color: var(--font-h2);
    padding-right: var(--padding-md);
  }
  > button:nth-child(2) {
    padding-left: var(--padding-md);
    padding-right: 2px;
    color: var(--color-mint);
  }
  > button:last-child {
    font-weight: 600;
  }
`;

export const ModalHeaderCenter = styled.header`
  margin-top: var(--margin-sub);
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
