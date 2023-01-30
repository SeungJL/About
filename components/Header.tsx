import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  justify-content: space-between;
  align-items: center;
  > div:first-child {
    color: RGB(22, 12, 3, 0.9);
    padding-bottom: 9px;
  }
`;
const HeaderTitle = styled.div`
  background: linear-gradient(rgba(174, 110, 70, 1), rgba(81, 44, 17, 1));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-family: "Marck Script", cursive;
  font-size: 48px;
  font-weight: 600;
`;

function Header() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <Container>
      <div>
        <Link href="/notice">
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        </Link>
      </div>
      <HeaderTitle onClick={onClick}>About</HeaderTitle>
      <div>
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          alt="prifile"
          src="/profile.jpg"
        />
      </div>
    </Container>
  );
}
export default Header;
