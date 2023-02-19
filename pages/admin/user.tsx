import { Flex, Grid, GridItem, Select, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { isPreviliged } from "../../libs/utils/authUtils";
import { getToday } from "../../libs/utils/dateUtils";
import dbConnect from "../../libs/dbConnect";
import { IUser, User } from "../../models/user";

const AdminUser: NextPage<{
  users: string;
}> = ({ users: usersParam }) => {
  const [activeUserId, setActiveUserId] = useState("");
  const {
    isOpen: isUserAdminModalOpen,
    onOpen: onUserAdminModalOpen,
    onClose: onUserAdminModalClose,
  } = useDisclosure();

  const users = useMemo(() => JSON.parse(usersParam) as IUser[], [usersParam]);
  const [startDay, endDay] = useMemo(() => {
    const today = getToday();
    const start = today.subtract(2, "week").startOf("week").add(1, "day");
    const end = today.subtract(1, "week").endOf("week").add(1, "day");

    return [start, end];
  }, []);

  const gridItemGen = (text) => {
    return (
      <GridItem
        w="100%"
        h="7"
        backgroundColor="blackAlpha.300"
        borderRadius="5px"
      >
        {text}
      </GridItem>
    );
  };

  const onUserRoleChange = (e, user) => {
    console.log(e.target.value);
  };

  return (
    <Flex flexDirection="column">
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={6}
        mb="5px"
        textAlign="center"
      >
        {gridItemGen("이름")}
        {gridItemGen("권한")}
        {gridItemGen("1주 참여")}
        {gridItemGen("2주 참여")}
        {gridItemGen("4주 참여")}
      </Grid>
      {users.map((user) => (
        <Grid templateColumns="repeat(5, 1fr)" gap={6} key={user.uid} mb="5px">
          {gridItemGen(user.name)}
          {gridItemGen(
            <Select
              border="none"
              h="100%"
              onChange={(e) => onUserRoleChange(e, user)}
            >
              <option value="member">member</option>
              <option value="previliged" selected={user.role === "previliged"}>
                previliged
              </option>
            </Select>
          )}
          {gridItemGen(user.statistic.voteCnt1Week)}
          {gridItemGen(user.statistic.voteCnt2Week)}
          {gridItemGen(user.statistic.voteCnt4Week)}
        </Grid>
      ))}
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login?from=/res",
      },
      props: {},
    };
  }

  if (!isPreviliged(session.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: "/forbidden",
      },
    };
  }
  await dbConnect();

  const users = await User.find({ role: { $in: ["member", "previliged"] } });

  return {
    props: {
      users: JSON.stringify(users),
    },
  };
};

export default AdminUser;
