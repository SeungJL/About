import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";

export const MainLoading = () => (
  <MainLoadingLayout>
    <ColorRing
      visible={true}
      height="40"
      width="40"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#ff6b6b", "#fd7b5b", "#ffa500", "#ffeae5", "#00c2b3"]}
    />
  </MainLoadingLayout>
);

const MainLoadingLayout = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
