import Slide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import Header from "../../Header";
interface IProgressHeader {
  value: number;
  title: string;
  url: string;
}
export default function ProgressHeader({ value, title, url }: IProgressHeader) {
  return (
    <Slide isFixed={true}>
      <ProgressStatus value={value} />
      <Header title={title} url={url} />
    </Slide>
  );
}
