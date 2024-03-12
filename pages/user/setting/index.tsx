import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/PageSlide";
import UserNavigation from "../../../pageTemplates/user/userNavigation/UserNavigation";

export default function Index() {
  return (
    <>
      <Header title="설정" url="/user" />
      <Slide>
        <UserNavigation />
      </Slide>
    </>
  );
}
