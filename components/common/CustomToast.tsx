import { useToast } from "@chakra-ui/react";
import styled from "styled-components";

export const useFailToast = () => {
  const toast = useToast();

  const showGuestRestrictionToast = () => {
    toast({
      title: "실패",
      description: "게스트는 사용할 수 없는 기능입니다.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  return showGuestRestrictionToast;
};

export const useCompleteToast = (text?: string) => {
  const toast = useToast();

  const showGuestRestrictionToast = () => {
    toast({
      title: "성공",
      description: text || "정상적으로 처리되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  return showGuestRestrictionToast;
};

const Layout = styled.div``;
