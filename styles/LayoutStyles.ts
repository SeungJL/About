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
export const ModalXs = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  width: 60%;
  height: 200px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 20;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

export const ModalSm = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 60%;
  height: 200px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 20;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

export const ModalLg = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: fixed;
  width: 90%;
  height: 240px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
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

export const ModalFooterNav = styled.footer`
  height: 30px;

  padding-top: 7px;
  text-align: end;
  > button {
    margin-right: 4px;
    width: 55px;
    height: 25px;
    border-radius: 10px;
    padding: 2px;
  }
  > button:first-child {
    color: var(--font-h2);
    background-color: var(--font-h6);
  }
  > button:last-child {
    color: white;
    background-color: var(--color-red);
  }
`;

export const ModalHeaderTitle = styled.header`
  color: var(--font-h1);
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid var(--font-h5);
  padding-bottom: 7px;
`;
