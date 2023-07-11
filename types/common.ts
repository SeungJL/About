import { Dispatch, SetStateAction } from "react";

export type DispatchBoolean = Dispatch<SetStateAction<boolean>>;
export type DispatchNumber = Dispatch<SetStateAction<number>>;

export interface IModal {
  setIsModal: DispatchBoolean;
}

export interface IRefetch {
  setIsRefetch: React.Dispatch<SetStateAction<boolean>>;
}
