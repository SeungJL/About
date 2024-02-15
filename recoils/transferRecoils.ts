import { atom } from "recoil";
import { Alphabet } from "../types2/serviceTypes/alphabetTypes";

export const transferAlphabetState = atom<Alphabet>({
  key: "TransferAlphabet",
  default: null,
});
