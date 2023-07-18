export const role = {
  previliged: { value: "previliged", display: "관리자" },
  member: { value: "member", display: "회원" },
  stranger: { value: "stranger", display: "미인증 사용자" },
};

export const isStranger = (roleStr: string) => {
  return roleStr === role.stranger.value;
};

export const isMember = (roleStr: string) => {
  return [
    role.member.value,
    role.previliged.value,
    role.stranger.value,
  ].includes(roleStr);
};

export const isPreviliged = (roleStr: string) => {
  return roleStr === role.previliged.value;
};

const CryptoJS = require("crypto-js");
const crypto = require("crypto");

export const makeCryptoKey = () => {
  const salt = crypto.randomBytes(16).toString("hex");
  const password = "about";
  const key = CryptoJS.PBKDF2(password, salt, { keySize: 128 / 32 });
  return key.toString(CryptoJS.enc.Base64);
};
