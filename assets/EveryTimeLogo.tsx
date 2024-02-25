import { Box } from "@chakra-ui/react";
import EveryTimeIcon from "../components/common/Icon/everyTimeIcon";

export default function EveryTimeLogo() {
  return (
    <Box fontSize="40px" fontWeight={800} lineHeight={1.3}>
      <Box position="relative">
        <Box
          as="span"
          rounded="lg"
          bg="var(--gray-8)"
          zIndex={2}
          color="#C62917"
        >
          에브리타임
        </Box>
        <Box position="absolute" zIndex={-1} top={-7} right={-4}>
          <EveryTimeIcon isSmall={false} />
        </Box>
        <br />
        <Box color="var(--gray-1)">홍보 이벤트</Box>
      </Box>
    </Box>
  );
}
