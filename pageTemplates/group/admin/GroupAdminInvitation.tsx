import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AlertModal, {
  IAlertModalOptions,
} from "../../../components2/AlertModal";
import Avatar from "../../../components2/atoms/Avatar";
import Selector from "../../../components2/atoms/Selector";
import { LOCATION_USE_ALL } from "../../../constants/location";
import { useAdminUsersLocationControlQuery } from "../../../hooks/admin/quries";
import { useUserInfoFieldMutation } from "../../../hooks/user/mutations";
import { IUserSummary } from "../../../types2/userTypes/userInfoTypes";

type UserType = "신규 가입자" | "전체";

interface IGroupAdminInvitation {
  belong: string;
}
export default function GroupAdminInvitation({
  belong,
}: IGroupAdminInvitation) {
  const { data: session } = useSession();
  const location = session?.user.location;

  const [value, setValue] = useState(location);
  const [userFilterValue, setUserFilterValue] =
    useState<UserType>("신규 가입자");
  const [filterUsers, setFilterUsers] = useState<IUserSummary[]>();
  const [inviteUser, setInviteUser] = useState<IUserSummary>(null);

  useEffect(() => {
    setValue(location);
  }, []);

  const { data: usersAll, isLoading } = useAdminUsersLocationControlQuery(
    value,
    { enabled: !!location }
  );
  console.log(5, belong);
  
  const { mutate } = useUserInfoFieldMutation("belong", {
    onSuccess() {
      console.log("SUC");
    },
  });

  useEffect(() => {
    if (!usersAll) return;
    setFilterUsers(usersAll.filter((user) => user.isActive && !user?.belong));
  }, [usersAll]);

  const USER_TYPE_ARR: UserType[] = ["신규 가입자", "전체"];
  console.log(2, belong);
  const alertOptions: IAlertModalOptions = {
    title: "유저 초대",
    subTitle: `${inviteUser?.name}님을 초대합니다. 즉시 가입이 되기 때문에 해당 멤버와 사전 이야기가 된 경우에 이용해주세요!`,
    func: () => {
      mutate({ uid: inviteUser.uid, belong });
    },
    text: "초대",
  };

  return (
    <>
      <Box mt="16px">
        <Flex justify="space-between">
          <Selector
            options={USER_TYPE_ARR}
            defaultValue={userFilterValue}
            setValue={setUserFilterValue}
          />
          <Selector
            options={LOCATION_USE_ALL}
            defaultValue={value}
            setValue={setValue}
          />
        </Flex>
        <Grid mt="20px" templateColumns="repeat(3,1fr)" gap="12px">
          {filterUsers?.map((who, idx) => (
            <Flex key={idx} justify="center" align="center">
              <Avatar
                image={who.profileImage}
                avatar={who.avatar}
                uid={who.uid}
                size="md"
              />
              <Flex direction="column" ml="8px">
                <Box>{who.name}</Box>
                <Button
                  colorScheme="mintTheme"
                  size="xs"
                  onClick={() => setInviteUser(who)}
                >
                  초대
                </Button>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Box>
      {inviteUser && (
        <AlertModal
          options={alertOptions}
          setIsModal={() => setInviteUser(null)}
        />
      )}
    </>
  );
}
