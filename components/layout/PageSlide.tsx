import { Slide } from "@chakra-ui/react";

interface IPageLayout {
  children: React.ReactNode;
}

function PageSlide({ children }: IPageLayout) {
  return (
    <Slide in={true} style={{ position: "static" }}>
      {children}
    </Slide>
  );
}

export default PageSlide;
