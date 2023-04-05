import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";

export default function Admin() {
  const secretKey = process.env.NEXTAUTH_SECRET;

  const onResetScore = () => {
    if (confirm("정말 초기화 하시겠습니까?")) {
      axios.delete("/api/admin/user/score");
    }
  };
  const onResetPoint = () => {
    if (confirm("정말 초기화 하시겠습니까?")) {
      axios.delete("/api/admin/user/point");
    }
  };
  const onDeleteVote = () => {
    if (confirm("정말 초기화 하시겠습니까?")) {
      axios.delete("/api/admin/vote", {
        headers: {
          secret: secretKey,
        },
      });
    }
  };
  return (
    <Flex flexDir="column">
      <Button onClick={onResetScore} m="5px 0" disabled>
        score초기화
      </Button>
      <Button onClick={onResetPoint} m="5px 0" disabled>
        point초기화
      </Button>
      <Button onClick={onDeleteVote} m="5px 0">
        현재날짜 + 3일 이후 투표 모두 삭제
      </Button>
      <Button></Button>
    </Flex>
  );
}
