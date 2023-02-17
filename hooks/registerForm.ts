import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { IUserInfoForm } from "../modals/RegisterFormModal";

export const useRegisterMutation = (userInfo: IUserInfoForm, options?: any) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(``);
  }, options);
