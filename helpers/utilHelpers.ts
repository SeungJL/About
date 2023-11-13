export const createNaverMapDot = (lat: number, lng: number) =>
  typeof naver !== "undefined" && new naver.maps.LatLng(lat, lng);
