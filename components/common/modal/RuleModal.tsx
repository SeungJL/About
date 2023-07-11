import styled from "styled-components";
import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
} from "../../../styles/layout/modal";
import { IModal } from "../../../types/common";
import { IContentBasic } from "../../../types/content";
import { ModalXXL } from "./Modals";

export interface IRuleModalContent {
  headerContent: IContentBasic;
  mainContent: IContentBasic[];
}

interface IRuleModal extends IModal {
  content: IRuleModalContent;
}

function RuleModal({ setIsModal, content }: IRuleModal) {
  if (!content) return null;
  const header = content.headerContent;
  const main = content.mainContent;

  const ContentItem = ({ title, texts }: IContentBasic) => (
    <Item>
      <RuleTitle>{title}</RuleTitle>
      <ItemContent>
        {texts.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ItemContent>
    </Item>
  );

  return (
    <ModalXXL>
      <ModalHeaderCenter>
        <Title>{header.title}</Title>
        <div>{header.text}</div>
      </ModalHeaderCenter>
      <ModalMain>
        {main.map((item, idx) => (
          <ContentItem title={item.title} texts={item.texts} key={idx} />
        ))}
      </ModalMain>
      <ModalFooterNav>
        <button onClick={() => setIsModal(false)}>확인</button>
      </ModalFooterNav>
    </ModalXXL>
  );
}

const Item = styled.div``;

const ItemContent = styled.ul`
  font-size: 11px;
  margin-left: var(--margin-main);
  margin-top: var(--margin-min);
  margin-bottom: var(--margin-sub);
  line-height: var(--line-height);
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: var(--font-h1);
`;

const RuleTitle = styled.span`
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
`;

export default RuleModal;
