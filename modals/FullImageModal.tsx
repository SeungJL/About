import Image from "next/image";
import { SetStateAction } from "react";
import styled from "styled-components";


function FullImageModal({
  setIsModal,
  image,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  image: string;
}) {
  const onClickClosed = () => {
    setIsModal(false);
  };
  return (
    <>
      <Layout>
        <Image
          src={`${image}`}
          width={300}
          height={300}
          unoptimized={true}
          alt="image"
        />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: pink;
`;

export default FullImageModal;
