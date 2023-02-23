import { atom, selector } from "recoil";
import { IPlazaData } from "../models/plaza";
import { plazaData } from "../storage/plazaData";

export const plazaCategoryState = atom({
  key: "plazaCategory",
  default: "all",
});

export const plazaDataSelector = selector({
  key: "plazaData",

  get: ({ get }) => {
    const category = get(plazaCategoryState);
    if (category === "all") return plazaData;
    const NewData = plazaData.filter((data) => data.category === category);
    return NewData;
  },
});
