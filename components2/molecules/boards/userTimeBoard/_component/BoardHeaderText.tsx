import HighlightedText, {
  IHighlightedText,
} from "@/components/atoms/HighlightedText";
import { faUserGroup } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IBoardHeaderText {
  headerText: IHighlightedText;
}
export default function BoardHeaderText({ headerText }: IBoardHeaderText) {
  return (
    <div className=" pb-3 flex items-center bg-gray-8">
      <FontAwesomeIcon
        icon={faUserGroup}
        className="text-gray-3 mr-1"
        size="sm"
      />
      <HighlightedText
        text={headerText.text}
        hightlightedText={headerText.hightlightedText}
      />
    </div>
  );
}
