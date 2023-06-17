export const ensureLocalStorage = (key: string, secondKey?: string) => {
  let temp = true;

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, "read");
    temp = false;
  }
  if (secondKey && !localStorage.getItem(secondKey)) {
    localStorage.setItem(secondKey, "read");
    temp = false;
  }

  return temp;
};
