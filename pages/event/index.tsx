import Slide from "../../components/layout/PageSlide";
import EventBadge from "../../pageTemplates/event/EventBadge";
import EventHeader from "../../pageTemplates/event/EventHeader";
import EventMission from "../../pageTemplates/event/EventMission";
import EventPoint from "../../pageTemplates/event/EventPoint";
import EventStore from "../../pageTemplates/event/EventStore";

export default function Index() {
  return (
    <>
      <EventHeader />
      <Slide>
        <EventMission />
        <EventStore />
        <EventPoint />
        <EventBadge />
      </Slide>
    </>
  );
}
