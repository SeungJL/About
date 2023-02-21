import { IUser } from "../../models/user";
import { ICategory } from "../../pages/members";

interface ISortUserList {
  (old: IUser[], category: ICategory): IUser[];
}

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

export const sortUserList: ISortUserList = (
  old: IUser[],
  category: ICategory
) => {
  const name = category.name;
  const status = category.status;
  let newUserList = [];
  let first;
  let second;

  if (name === "registerDate") {
    if (status === "up" || status === "") {
      newUserList = old?.sort(function (a, b) {
        first = Number(
          a[name].slice(0, 4) + a[name].slice(5, 7) + a[name].slice(8, 10)
        );
        second = Number(
          b[name].slice(0, 4) + b[name].slice(5, 7) + b[name].slice(8, 10)
        );

        if (first > second) return 1;
        if (first < second) return -1;
        return 0;
      });

      return newUserList;
    } else {
      newUserList = old?.sort(function (a, b) {
        first = Number(
          a[name].slice(0, 4) + a[name].slice(5, 7) + a[name].slice(8, 10)
        );
        second = Number(
          b[name].slice(0, 4) + b[name].slice(5, 7) + b[name].slice(8, 10)
        );
        if (first > second) return -1;
        if (first < second) return 1;
        return 0;
      });

      return newUserList;
    }
  }
  if (name === "birth") {
    if (status === "up" || status === "") {
      newUserList = old.sort(function (a, b) {
        first = Number(birthToAge(a[name]));
        second = Number(birthToAge(b[name]));
        console.log(first, second);
        if (first > second) return 1;
        if (first < second) return -1;
        return 0;
      });

      return newUserList;
    } else {
      newUserList = old.sort(function (a, b) {
        first = Number(birthToAge(a[name]));
        second = Number(birthToAge(b[name]));
        console.log(1, first, second);
        if (first > second) return -1;
        if (first < second) return 1;
        return 0;
      });

      return newUserList;
    }
  }
  if (name === "gender") {
    if (status === "남") {
      newUserList = old.filter((user) => user.gender === "남성");
    } else {
      newUserList = old.filter((user) => user.gender === "여성");
    }
    return newUserList;
  }
  return old;
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
  const birthYear = Number(birth.slice(0, 2));
  if (birthYear < 50) return String(24 - birthYear);
  else return String(124 - birthYear);
};

export const isChangedCategoryName = (name, status) => {
  if (name === "gender" && status !== "") return true;
  return false;
};
