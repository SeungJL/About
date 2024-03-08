import { Box, Flex, Grid } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Avatar from "../../../components2/atoms/Avatar";
import Selector from "../../../components2/atoms/Selector";
import { LOCATION_USE_ALL } from "../../../constants/location";
import { useAdminUsersLocationControlQuery } from "../../../hooks/admin/quries";
import { IUser } from "../../../types2/userTypes/userInfoTypes";

interface IGroupAdminInvitation {}
export default function GroupAdminInvitation({}: IGroupAdminInvitation) {
  const { data: session } = useSession();
  const location = session?.user.location;

  const [value, setValue] = useState(location);
  const [filterUsers, setFilterUsers] = useState<IUser[]>();

  useEffect(() => {
    setValue(location);
  }, []);

  const { data: usersAll, isLoading } = useAdminUsersLocationControlQuery(
    value,
    { enabled: !!location }
  );
  console.log(location);
  useEffect(() => {
    if (!usersAll) return;
    setFilterUsers(usersAll.filter((user) => user.isActive && !user?.belong));
  }, [usersAll]);

  console.log(filterUsers);

  return (
    <Box mt="16px">
      <Flex>
        <Selector
          options={LOCATION_USE_ALL}
          defaultValue={value}
          setValue={setValue}
        />
      </Flex>
      <Grid>
        {filterUsers?.map((who, idx) => (
          <Box key={idx}>
            <Avatar
              image={who.profileImage}
              avatar={who.avatar}
              uid={who.uid}
              size="sm"
            />
            <Box>{who.name}</Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
