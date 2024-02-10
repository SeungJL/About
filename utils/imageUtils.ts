import { GATHER_RANDOM_IMAGE_ARR } from "@/assets/images/randomImages";
export const getRandomImage = (type: "gather") => {
  const idx = Math.floor(Math.random() * GATHER_RANDOM_IMAGE_ARR.length);
  return GATHER_RANDOM_IMAGE_ARR[idx];
};

export const adjustCircleLogo = (name: string) => {
  return 40;
};
