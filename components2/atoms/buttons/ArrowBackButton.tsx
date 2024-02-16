import styled from "styled-components";

import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  prevPageUrlState,
  slideDirectionState,
} from "../../../recoils/navigationRecoils";
interface IArrowBackButton {
  url?: string;
}
export default function ArrowBackButton({ url }: IArrowBackButton) {
  const router = useRouter();
  const [prevPageUrl, setPrevPageUrl] = useRecoilState(prevPageUrlState);
  const setSlideDirection = useSetRecoilState(slideDirectionState);

  const handleGoBack = () => {
    setSlideDirection("left");
    if (prevPageUrl) {
      router.push(prevPageUrl);
      setPrevPageUrl(null);
    } else if (url) router.push(url);
    else router.back();
  };

  return (
    <Button onClick={handleGoBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </Button>
  );
}

const Button = styled.button`
  padding: 16px;
`;
