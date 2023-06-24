import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

interface IWritingIcon {
  url: string;
}

function WritingIcon({ url }: IWritingIcon) {
  const router = useRouter();
  return (
    <Layout onClick={() => router.push(url)}>
      <FontAwesomeIcon icon={faPencil} color="white" size="lg" />
    </Layout>
  );
}

const Layout = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--color-mint);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default WritingIcon;
