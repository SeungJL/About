import { useState } from "react";
import Slide from "../../../components/layout/PageSlide";
import AlertNotCompletedModal from "../../../components2/AlertNotCompletedModal";
import Header from "../../../components2/Header";
import ButtonCard from "../../../components2/molecules/cards/ButtonCard";
import { POINT_GET_ACTIBITY_LIST } from "../../../constants2/serviceConstants/pointSystemConstants";

export default function Activity() {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Header title="동아리 활동" />
      <Slide>
        {POINT_GET_ACTIBITY_LIST.map((item, idx) => (
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
