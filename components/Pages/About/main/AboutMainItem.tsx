import styled from "styled-components";
import { IconHOLLYS } from "../../../../public/icons/IconImg";
import { IconUserTwo } from "../../../../public/icons/Icons";

function AboutMainItem() {
  return (
    <Layout>
      <ImageContainer>
        <IconHOLLYS />
      </ImageContainer>
      <SpaceInfo>
        <Status>
          <div>수원역</div>
        </Status>
        <Info>
          <span>할리스</span>
          <div>
            <IconUserTwo />
            <span>
              <span>6명</span> 참여중
            </span>
          </div>
        </Info>
        <Participants></Participants>
      </SpaceInfo>
    </Layout>
  );
}

const Layout = styled.div`
  height: 110px;
  background-color: white;
  display: flex;
  padding: 16px 24px 16px 16px;
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  margin-right: 12px;
`;

const SpaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Status = styled.div`
  text-align: center;
  margin-bottom: 5px;
  > div {
    background-color: #ffeae5;
    color: #fd7b5b;
    width: 48px;
    height: 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 10px;
    padding: 1px;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: #565b67;
    font-family: "PretendardSemiBold";
    font-weight: 600;
    font-size: 15px;
  }
  > div {
    display: flex;
    align-items: center;
    > span {
      font-weight: 400;
      font-size: 12px;
      margin-left: 2px;
      color: #767d8a;
      > span {
        font-weight: 600;
      }
    }
  }
`;
const Participants = styled.div``;

export default AboutMainItem;
