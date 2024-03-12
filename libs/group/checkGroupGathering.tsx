export const checkGroupGathering = (hashArr: string): string => {
  let belong;
  hashArr?.split("#").forEach((hash) => {
    if (hash.match(/\/[A-Z]/)) {
      belong = hash;
      return;
    }
  });
  return belong;
};
