import styled from "styled-components";

import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
interface IArrowBackButton {
  url?: string;
}
export default function ArrowBackButton({ url }: IArrowBackButton) {
  const router = useRouter();

  const handleGoBack = () => {
    if (url) router.push(url);
    else router.back();
  };

  return (
    <Button onClick={handleGoBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </Button>
  );
}

const Button = styled.button`
  padding: 8px;
`;
