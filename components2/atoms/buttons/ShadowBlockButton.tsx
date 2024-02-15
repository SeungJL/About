import Link from "next/link";
import styled from "styled-components";
interface IShadowBlockButton {
  text: string;
  url?: string;
}
export default function ShadowBlockButton({ text, url }: IShadowBlockButton) {
  return (
    <>
      {url ? (
        <Link href={url}>
          <ButtonComponent text={text} />
        </Link>
      ) : (
        <ButtonComponent text={text} />
      )}
    </>
  );
}

const ButtonComponent = ({ text }: { text: string }) => <Button>{text}</Button>;

const Button = styled.button`
  width: 100%;
  background-color: white;
  color: var(--color-mint);
  box-shadow: var(--shadow);
  border: var(--border);
  font-weight: 600;
  height: 44px;
  border-radius: var(--rounded-lg);
  :hover {
    background-color: var(--gray-7);
  }
`;
