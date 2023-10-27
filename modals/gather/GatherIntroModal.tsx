import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { IModal } from "../../types/reactTypes";

function GatherIntroModal({ setIsModal }: IModal) {
  return (
    <ModalLayout size="lg" onClose={() => setIsModal(false)}>
      <ModalHeader text="11월, 모임 컨텐츠 활성화 안내" />
      <ModalBody>
        <Ol>
          <li>매주 토요일마다 주모임이 개설됩니다.</li>
          <Ul>
            <li>수요일까지 신청을 받고 인원이 되는 경우 오픈</li>
            <li>격주 토요일은 20대 초반 모임으로 진행</li>
          </Ul>
          <li>두달에 한번 정기모임이 진행됩니다.</li>
          <Ul>
            <li>파티룸, 대형술집, 여행 등</li>
          </Ul>
          <li>번개 오픈시 5000원 지원금</li>
          <Ul>
            <li>4인 이상, 오프라인 모임이 오픈된 경우</li>
          </Ul>
        </Ol>
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const Ol = styled.ol`
  margin-left: var(--margin-main);
  font-size: 13px;
  font-weight: 600;
  color: var(--font-h2);
  line-height: 2;
  > ul:last-child {
    margin-bottom: 0;
  }
`;

const Ul = styled.ul`
  line-height: 1.6;
  font-size: 12px;
  margin-left: var(--margin-sub);
  margin-top: var(--margin-min);
  margin-bottom: var(--margin-md);
  font-weight: 400;
  li {
    list-style-type: disc;
  }
`;

export default GatherIntroModal;
