export const checkGroupGathering = (hashArr: string): string => {
  let belong;

  hashArr?.split("#").forEach((hash) => {
    // 해시태그에서 불필요한 공백 제거
    const trimmedHash = hash.trim();

    if (trimmedHash.match(/[A-Z]/)) {
      belong = trimmedHash;
      return;
    }
  });

  return belong;
};
