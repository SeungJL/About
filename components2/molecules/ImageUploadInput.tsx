import { Input } from "@chakra-ui/react";
import { faCameraViewfinder } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heic2any from "heic2any";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import { DispatchType } from "../../types2/reactTypes";
interface IImageUploadInput {
  setImageUrl: DispatchType<any>;
}

export default function ImageUploadInput({
  setImageUrl: changeImage,
}: IImageUploadInput) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // HEIC 파일이면 JPEG로 변환
      if (file.type === "image/heic") {
        try {
          const convertedBlob = (await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8,
          })) as Blob;

          // 변환된 Blob으로 미리보기 생성 및 상태 업데이트
          const image = URL.createObjectURL(convertedBlob);
          setImageUrl(image);
          changeImage(convertedBlob); // 변환된 Blob을 상위 컴포넌트에 전달
        } catch (error) {
          console.error("Error converting HEIC to JPEG", error);
        }
      } else {
        // HEIC가 아니라면 기존 로직대로 처리
        const image = URL.createObjectURL(file);
        setImageUrl(image);
        changeImage(file);
      }
    }
  };

  const fileInputRef = useRef(null);

  const handleBtnClick = () => {
    fileInputRef.current.click();
  };

  // useEffect(() => {
  //   changeImage(imageUrl);
  // }, [imageUrl]);

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
