import { faGear } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/layouts/Header";
import IconButtonNav, {
  IIconButtonNavBtn,
} from "../../components/molecules/navs/IconButtonNav";
interface IUserHeader {}
export default function UserHeader({}: IUserHeader) {
  const iconBtnArr: IIconButtonNavBtn[] = [
    {
      icon: <FontAwesomeIcon icon={faGear} size="lg" />,
      link: "/user/setting",
    },
  ];
  return (
    <Header title="마이페이지" url="/home">
      <IconButtonNav iconList={iconBtnArr} />
    </Header>
  );
}
