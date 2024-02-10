"use client";

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
    <button className="p-2" onClick={handleGoBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
}
