import { faGear } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components2/Header";
import IconButtonNav, {
  IconButtonNavBtn,
} from "../../components2/molecules/navs/IconButtonNav";
interface IUserHeader {}
export default function UserHeader({}: IUserHeader) {
  const iconBtnArr: IconButtonNavBtn[] = [
    {
      icon: <FontAwesomeIcon icon={faGear} size="lg" />,
      link: "/user/setting",
    },
  ];
  return (
    <Header title="마이페이지">
      <IconButtonNav iconList={iconBtnArr} />
    </Header>
  );
}
