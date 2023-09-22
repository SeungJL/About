import styled from "styled-components";

interface IBlurredPart {
  children: React.ReactNode;
  isBlur?: boolean;
}

function BlurredPart({ children, isBlur }: IBlurredPart) {
  return (
    <Container isBlur={isBlur}>
      <Layout isBlur={isBlur}>{children}</Layout>
      {isBlur && <Message>게스트는 확인할 수 없는 내용입니다!</Message>}
    </Container>
  );
}

const Container = styled.div<{ isBlur?: boolean }>`
  position: ${(props) => props.isBlur && "relative"};
`;

const Layout = styled.div<{ isBlur?: boolean }>`
  filter: ${(props) => props.isBlur && "blur(6px)"};
`;

const Message = styled.div`
  width: max-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 600;
  color: var(--font-h2);
`;

export default BlurredPart;
