import { Slide as ChakraSlide } from "@chakra-ui/react";

interface IPageLayout {
  isFixed?: boolean;
  posZero?: "top";
  children: React.ReactNode;
}

function Slide({ children, isFixed, posZero }: IPageLayout) {
  return (
    <ChakraSlide
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
