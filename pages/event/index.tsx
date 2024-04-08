import Slide from "../../components/layouts/PageSlide";
import EventBadge from "../../pageTemplates/event/EventBadge";
import EventHeader from "../../pageTemplates/event/EventHeader";
import EventMission from "../../pageTemplates/event/EventMission";
import EventPoint from "../../pageTemplates/event/EventPoint";
import EventStore from "../../pageTemplates/event/EventStore";
import HomeWinRecordSection from "../../pageTemplates/home/HomeWinRecordSection";

export default function Index() {
  return (
    <>
      <EventHeader />
      <Slide>
        <EventMission />
        <EventStore />
        <EventPoint />
        <EventBadge />
        <HomeWinRecordSection />
      </Slide>
    </>
  );
}
