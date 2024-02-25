import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
interface IProgressHeader {
  value: number;
  title: string;
}
export default function ProgressHeader({ value, title }: IProgressHeader) {
  return (
    <Slide isFixed={true}>
      <ProgressStatus value={value} />
      <Header isSlide={false} title={title} />
    </Slide>
  );
}
