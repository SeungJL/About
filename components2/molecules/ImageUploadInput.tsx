import { Input } from "@chakra-ui/react";
import { faCameraViewfinder } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";

interface IImageUploadInput {}

export default function ImageUploadInput({}: IImageUploadInput) {
  const [imageUrl, setImageUrl] = useState(null);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fileInputRef = useRef(null);

  const handleBtnClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Input
        display="none"
        ref={fileInputRef}
        id="studyAttendImage"
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
      />
      <Container onClick={handleBtnClick}>
        {!imageUrl ? (
          <>
            <FontAwesomeIcon
              icon={faCameraViewfinder}
              size="4x"
              color="var(--gray-4)"
            />
            <CameraText>사진 올리기</CameraText>
          </>
        ) : (
          <ImageContainer>
            <Image
              src={imageUrl}
              alt="Image Preview"
              width={140}
              height={140}
            />
          </ImageContainer>
        )}
      </Container>
    </>
  );
}

const CameraText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-4);
  margin-top: var(--gap-3);
`;

const Container = styled.div`
  margin: var(--gap-1) 0;
  padding: 16px;
  padding-bottom: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1.5px dashed var(--gray-5);
  border-radius: var(--rounded-lg);
  background-color: var(--gray-8);
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
`;
