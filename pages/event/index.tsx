import Slide from "../../components/layout/PageSlide";
import EventHeader from "../../pageTemplates/event/EventHeader";
import EventMain from "../../pageTemplates/event/EventMain";
import EventMission from "../../pageTemplates/event/EventMission";

export default function Index() {
  return (
    <>
      <Slide isFixed={true}>
        <EventHeader />
      </Slide>
      <Slide>
        <EventMission />
        <EventMain />
      </Slide>
    </>
  );
}
