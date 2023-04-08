import styled from "styled-components";

export const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullScreen = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
`;

export const ModalSm = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  width: 280px;
  height: 328px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

  z-index: 20;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;
export const ModalXs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  width: 80%;
  height: 240px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
`;

export const ModalMd = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  width: 90%;
  height: 240px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
`;
export const ModalXL = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  width: 344px;
  height: 360px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

export const ModalXXL = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  width: 90%;
  height: 500px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 20;
  display: flex;
  flex-direction: column;
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
