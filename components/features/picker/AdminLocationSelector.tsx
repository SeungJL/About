import { Box } from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { LOCATION_ALL } from "../../../constants/location";

import { Location } from "../../../types/system";
import { IUserRegisterForm } from "../../../types/user/user";
import { IUserRequest } from "../../../types/user/userRequest";

interface IAdminLocationSelector {
  initialData: IUserRegisterForm[] | IUserRequest[];
  setRequestData: React.Dispatch<
    SetStateAction<IUserRegisterForm[] | IUserRequest[]>
  >;
  type: string;
}

function AdminLocationSelector({
  initialData,
  setRequestData,
  type,
}: IAdminLocationSelector) {
  const [category, setCategory] = useState<Location | "기타">("수원");

  useEffect(() => {
    if (!initialData) return;
    if (type === "register")
      setRequestData(
        (initialData as IUserRegisterForm[])?.filter((who) =>
          category !== "기타"
            ? who.location === category
            : !LOCATION_ALL.includes(who.location)
        )
      );
    if (type === "request") {
      setRequestData(
        (initialData as IUserRequest[])?.filter(
          (who) => who.location === category
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, initialData, type]);

  return (
    // <ButtonCheckNav
    //   buttonList={[...RegisterLocation]}
    //   selectedButton={category}
    //   setSelectedButton={setCategory}
    // />
    <Box>temp</Box>
  );
}

const Layout = styled.div``;

export default AdminLocationSelector;
