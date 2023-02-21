import { IUser } from "../../models/user";
import { ICategory } from "../../pages/members";

interface ISortUserList {
  (old: IUser[], category: ICategory): IUser[];
}

export const sortUserList: ISortUserList = (
  old: IUser[],
  category: ICategory
) => {
  const name = category.name === "가입일" ? "registerDate" : "";
  const subCategory = category.isSortUp;
  console.log(subCategory);
  if (name) {
    if (subCategory) {
      const newUserList = old.sort(function (a, b) {
        if (a[name] > b[name]) {
          return 1;
        }
        if (a[name] < b[name]) return -1;
        return 0;
      });

      return newUserList;
    } else {
      const newUserList = old.sort(function (a, b) {
        if (a[name] > b[name]) {
          return -1;
        }
        if (a[name] < b[name]) return 1;
        return 0;
      });
      console.log(2, newUserList);
      return newUserList;
    }
  }
  return old;
};
