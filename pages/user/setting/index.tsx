import Slide from "../../../components/layout/PageSlide";
import Header from "../../../components2/Header";
import UserNavigation from "../../../pageTemplates/user/userNavigation/UserNavigation";

export default function Index() {
  return (
    <>
      <Slide isFixed={true}>
        <Header title="설정" />
      </Slide>
      <Slide>
        <UserNavigation />
      </Slide>
    </>
  );
}
