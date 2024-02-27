import { useState } from "react";
import styled from "styled-components";
import { IFooterOptions, ModalLayout } from "../../../components/modals/Modals";
import TabNav, {
  ITabNavOptions,
} from "../../../components2/molecules/navs/TabNav";
import { IModal } from "../../../types/reactTypes";
import PointSystemsModalFee from "./PointSystemsModalFee";
import PointSystemsModalPoint from "./PointSystemsModalPoint";

function PointSystemsModal({ setIsModal }: IModal) {
  const [isFirst, setIsFirst] = useState(true);

  const footerOptions: IFooterOptions = {
    main: {},
  };

  const tabNavOptions: ITabNavOptions[] = [
    {
      text: "ABOUT 포인트",
      func: () => setIsFirst(true),
      flex: 1,
    },
    {
      text: "스터디 벌금",
      func: () => setIsFirst(false),
      flex: 1,
    },
  ];

  return (
    <ModalLayout
      title="포인트 가이드"
      footerOptions={footerOptions}
      headerOptions={{
        subTitle: "대학색들의 카공 및 친목 동아리 ABOUT",
      }}
      setIsModal={setIsModal}
    >
      <TabNav tabOptionsArr={tabNavOptions} />
      <Wrapper>
        {isFirst ? <PointSystemsModalPoint /> : <PointSystemsModalFee />}
      </Wrapper>
    </ModalLayout>
  );
}

const Wrapper = styled.div`
  height: 100%;
  margin-top: var(--gap-2);
`;

export default PointSystemsModal;
