export const checkIsKorean = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // 한글 자모음 범위: 0x1100 ~ 0x11FF
    // 알파벳 a ~ z 범위: 0x61 ~ 0x7A
    if (0xac00 > code || code > 0xd7a3) {
      return false;
    }
  }
  return true;
};

export const randomPassword = () => {
  let newPassword = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newPassword += characters[randomIndex];
  }
  return newPassword;
};

