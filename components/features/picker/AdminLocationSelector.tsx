import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { RegisterLocation } from "../../../constants/location";

import { Location } from "../../../types/system";
import { IUserRegisterForm } from "../../../types/user/user";
import { IUserRequest } from "../../../types/user/userRequest";
import ButtonCheckNav from "../../templates/ButtonCheckNav";

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
  const [category, setCategory] = useState<Location>("수원");

  useEffect(() => {
    if (type === "register")
      setRequestData(
        (initialData as IUserRegisterForm[])?.filter(
          (who) => who.location === category
        )
      );
    if (type === "request")
      setRequestData(
        (initialData as IUserRequest[])?.filter(
          (who) => who.location === category
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, initialData, type]);

  return (
    <ButtonCheckNav
      buttonList={RegisterLocation}
      selectedButton={category}
      setSelectedButton={setCategory}
    />
  );
}

const Layout = styled.div``;

export default AdminLocationSelector;
