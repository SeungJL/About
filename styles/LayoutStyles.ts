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
  position: absolute;
  width: 60%;
  height: 300px;
  top: 70px;
  padding: 10px;
  left: 50%;
  transform: translate(-50%);

  z-index: 10;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

export const ModalLg = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 80%;
  height: 220px;
  top: 220px;
  padding: 10px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

export const ModalXXL = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 90%;
  height: 500px;
  top: 70px;
  padding: 10px;
  left: 50%;
  transform: translate(-50%);

  z-index: 10;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;
