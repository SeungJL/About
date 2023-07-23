import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function RegisterLayout({
  children,
  errorMessage,
}: {
  children: ReactNode;
  errorMessage?: string;
}) {
  const { register, handleSubmit } = useForm();

  const onValid = (data) => {};
  return (
    <Layout onSubmit={handleSubmit(onValid)}>
      {children}
      <Message>{errorMessage}</Message>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  padding-bottom: 60px;
`;

const Message = styled.div`
  font-size: 11px;
  color: var(--color-red);
  padding: 6px;
  padding-left: 12px;
`;

export default RegisterLayout;
