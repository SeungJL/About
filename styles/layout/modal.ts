import styled from "styled-components";

export const FullScreen = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
`;
export const ModalXs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  width: var(--width-80);
  height: var(--height-sm);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  box-shadow: var(--box-shadow);
`;

export const ModalMd = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  width: var(--width-90);
  height: var(--height-sm);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  box-shadow: var(--box-shadow);
`;

export const ModalLgLight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: white;
  width: var(--width-80);
  height: var(--height-md);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  box-shadow: var(--box-shadow);
`;
export const ModalLg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  width: var(--width-90);
  height: var(--height-md);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  box-shadow: var(--box-shadow);
`;

export const ModalXXL = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  width: var(--width-90);
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 20;
  border-radius: 16px;
`;

export const ModalHeaderLine = styled.header`
  color: var(--font-h1);
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid var(--font-h5);
  padding-bottom: 14px;
`;

export const ModalMain = styled.main`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  color: var(--font-h2);
  font-size: 13px;
`;

export const ModalSubtitle = styled.div`
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--font-h1);
  font-size: 14px;
`;

export const ModalFooterNav = styled.footer`
  display: flex;
  justify-content: flex-end;
  > button {
    font-size: 14px;
    cursor: pointer;
  }
  > button:first-child {
    color: var(--font-h2);
    margin-right: 16px;
  }
  > button:last-child {
    color: var(--color-red);
    margin-right: 3px;
    font-weight: 600;
  }
`;