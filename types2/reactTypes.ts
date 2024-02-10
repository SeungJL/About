import { Dispatch, ReactNode, SetStateAction } from "react";


export type DispatchType<T> = Dispatch<SetStateAction<T>>;
