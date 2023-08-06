export const getRestInfo = (restData: string) => {
  const [type, date, content] = restData.split(`/`);
  return {
    type,
    date,
    content,
  };
};
