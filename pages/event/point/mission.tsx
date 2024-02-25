import { useState } from "react";
import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/PageSlide";
import AlertNotCompletedModal from "../../../components2/AlertNotCompletedModal";
import ButtonCard from "../../../components2/molecules/cards/ButtonCard";
import { POINT_GET_EVENT_LIST } from "../../../constants2/serviceConstants/pointSystemConstants";

export default function Mission() {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Header title="동아리 활동" />
      <Slide>
        {POINT_GET_EVENT_LIST.map((item, idx) => (
          <ButtonCard
            key={idx}
            props={{ ...item, func: () => setIsModal(true) }}
          />
        ))}
      </Slide>
      {isModal && <AlertNotCompletedModal setIsModal={setIsModal} />}
    </>
  );
}
