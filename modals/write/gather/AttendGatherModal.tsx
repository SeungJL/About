import styled from "styled-components";

const GatherVoteLayout = styled.div`
  width: 350px;
  height: 420px;
  background-color: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GatherVoteModal = () => {
  return <GatherVoteLayout></GatherVoteLayout>;
};
