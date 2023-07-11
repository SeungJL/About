import { Dispatch, SetStateAction } from "react";

export type DispatchBoolean = Dispatch<SetStateAction<boolean>>;

export interface IModal {
  setIsModal: DispatchBoolean;
}
