import { Slide as ChakraSlide } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { slideDirectionState } from "../../recoils/navigationRecoils";

interface IPageLayout {
  isFixed?: boolean;
  posZero?: "top";
  children: React.ReactNode;
}

function Slide({ children, isFixed, posZero }: IPageLayout) {
  const [slideDirection, setSlideDirection] =
    useRecoilState(slideDirectionState);

  useEffect(() => {
    setSlideDirection("right");
  }, []);

  return (
    <ChakraSlide
      direction={slideDirection}
      in={true}
      style={{
        position: isFixed ? "fixed" : "static",
        zIndex: isFixed ? 100 : 0,
        height: isFixed ? "min-content" : "max-content",
        top: posZero === "top" ? null : 0,
      }}
    >
      {children}
    </ChakraSlide>
  );
}

export default Slide;
