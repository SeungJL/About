import Slide from "../../../components/layout/PageSlide";
import Header from "../../../components2/Header";
import UserNavigation from "../../../pageTemplates/user/userNavigation/UserNavigation";

export default function Index() {
  return (
    <>
      <Header title="설정" />
      <Slide>
        <UserNavigation />
      </Slide>
    </>
  );
}
