import dayjs from "dayjs";

export const setCategoryStatus = (name: string, status: string) => {
  const statusState = ["registerDate", "birth"].includes(name)
    ? "upDown"
    : name;
  if (statusState === "upDown") {
    if (status === "") status = "up";
    else if (status === "up") status = "down";
    else status = "";
  }
  if (statusState === "gender") {
    if (status === "") status = "남";
    else if (status === "남") status = "여";
    else status = "";
  }
  return { name, status };
};

export const nameToKr = (name) => {
  if (name === "registerDate") return "가입일";
  if (name === "birth") return "나이";
  if (name === "gender") return "성별";
  if (name === "mbti") return "MBTI";
  if (name === "role") return "역할";
  return name;
};

export const birthToAge = (birth: string) => {
  const yearSlice = birth?.slice(0, 2);
  const birthYear = +yearSlice < 50 ? "20" + yearSlice : "19" + yearSlice;
  const currentYear = dayjs().year();
  const birthDate = dayjs(birth.slice(3, 4) + "-" + birth.slice(4)).year(
    dayjs().year()
  );

  const age = currentYear - +birthYear;

  if (birthDate < dayjs()) {
    return age;
  } else return age - 1;
};

export const isChangedCategoryName = (name, status) => {
  if (name === "gender" && status !== "") return true;
  return false;
};
