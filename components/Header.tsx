import {
  faArrowLeft,
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--font-black);
  align-items: center;
  height: 45px;

  padding: 10px 15px;
`;
const BackBtn = styled.div`
  width: 15%;
`;

const ConvenienceBtns = styled.div`
  width: 20%;
  text-align: end;
  span {
    margin-left: 18px;
  }
`;

function Header() {
  return (
    <HeaderLayout>
      <BackBtn>
        <Link href="/about">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </Link>
      </BackBtn>

      <ConvenienceBtns>
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </span>
        <span>
          <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
        </span>
      </ConvenienceBtns>
    </HeaderLayout>
  );
}
export default Header;
