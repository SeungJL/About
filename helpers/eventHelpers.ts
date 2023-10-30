import { ALPHABET_COLLECTION } from "../constants/contentsValue/collection";

export const getRandomAlphabet = (percent: number) => {
  const randomValue = Math.random();

  if (randomValue <= percent / 100) {
    const randomIdx = Math.floor(Math.random() * 0.2);
    const alphabet = ALPHABET_COLLECTION[randomIdx];
    return alphabet;
  }
  return null;
};
