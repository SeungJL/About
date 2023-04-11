import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { isPreviliged } from "../../libs/utils/authUtils";
import { User } from "../../models/user";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const user = await User.findOne({ uid: session.uid });
  if (!user.role) {
    return {
      redirect: {
        permanent: false,
        destination: "/about",
      },
    };
  }
  if (user && !isPreviliged(user.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: "/forbidden",
      },
    };
  }
  return {
    props: {},
  };
};
