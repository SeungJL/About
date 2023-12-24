export const createNaverMapDot = (lat: number, lng: number) =>
  typeof naver !== "undefined" && new naver.maps.LatLng(lat, lng);

export const shuffleArray = (array: any[]) => {
  if (!array) return;
  return array.sort(() => Math.random() - 0.5);
};
