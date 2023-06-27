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

export const Modal2Xs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  background-color: white;
  width: var(--width-80);
  height: 120px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 16;
  box-shadow: var(--box-shadow);
  font-size: 12px;
`;

export const ModalXs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background-color: white;
  width: var(--width-80);
  height: var(--height-sm);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 16;
  box-shadow: var(--box-shadow);
`;

export const ModalMd = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background-color: white;
  width: var(--width-90);
  height: var(--height-sm);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 17;
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
  z-index: 18;
  box-shadow: var(--box-shadow);
`;

export const ModalLg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background-color: white;
  width: var(--width-90);
  height: var(--height-md);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 19;
  box-shadow: var(--box-shadow);
`;
export const ModalXL = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background-color: white;
  /* border: 2px solid rgb(0, 0, 0, 0.4); */
  position: fixed;
  width: var(--width-90);
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 20;
  border-radius: 16px;
`;

export const ModalXXL = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background-color: white;
  /* border: 2px solid rgb(0, 0, 0, 0.4); */
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
  padding-bottom: 12px;
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
  padding-bottom: 12px;
  > span:first-child {
    font-size: 18px;
    font-weight: 600;
    color: var(--font-h1);
    padding-bottom: 4px;
  }
  > div {
    margin-top: 12px;
    font-size: 13px;
    color: var(--font-h2);
  }
`;
