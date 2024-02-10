import { faShareNodes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IKakaoShareButton {}
export default function KakaoShareButton({}: IKakaoShareButton) {
  return (
    <div className="flex justify-center items-center ">
      <FontAwesomeIcon icon={faShareNodes} size="lg" />
    </div>
  );
}
