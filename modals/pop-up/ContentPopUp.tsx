import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";

import { IModal } from "../../types/reactTypes";

export interface IContentPopUpContents {
  title: string;
  contents: { subtitle: string; content: string[] }[];
}

interface IContentPopUp extends IModal {
  content: IContentPopUpContents;
}

function ContentPopUp({ content, setIsModal }: IContentPopUp) {
  return (
    <>
      <ModalLayout size="lg" onClose={() => setIsModal(false)}>
        <ModalHeader text={content.title} />
        <ModalBody>
          <Wrapper>
            {content.contents.map((item, idx) => (
              <Container key={idx}>
                <Subtitile>{item.subtitle}</Subtitile>
                <Ul>
                  {item.content.map((text, idx2) => (
                    <li key={idx2}>{text}</li>
                  ))}
                </Ul>
              </Container>
            ))}
          </Wrapper>
        </ModalBody>
        <ModalFooterOne onClick={() => setIsModal(false)} />
      </ModalLayout>
    </>
  );
}

const Subtitile = styled.div`
  color: var(--font-h2);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: var(--margin-min);
`;

const Ul = styled.ul`
  font-size: 12px;
  color: var(--font-h2);
  margin-left: var(--margin-main);
`;
const Wrapper = styled.div`
  > div:first-child {
    margin-bottom: var(--margin-md);
  }
`;

const Container = styled.div``;

export default ContentPopUp;
