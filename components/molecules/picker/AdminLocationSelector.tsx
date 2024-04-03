import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { LOCATION_ALL, RegisterLocation } from "../../../constants/location";

import { IUserRegisterForm } from "../../../types/user/user";
import { IUserRequest } from "../../../types/user/userRequest";
import ButtonCheckNav from "../ButtonCheckNav";

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
  const [category, setCategory] = useState<string>("수원");

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
    <ButtonCheckNav
      buttonList={[...RegisterLocation]}
      selectedButton={category}
      setSelectedButton={(value: string) => setCategory(value)}
    />
  );
}

const Layout = styled.div``;

export default AdminLocationSelector;
