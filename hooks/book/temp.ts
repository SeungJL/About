import { SERVER_URI } from "../../constants/system";

export function fetchFamousBooks() {
  return fetch(`${SERVER_URI}/book`, {
    method: "get",
  }).then((response) => response.json());
}
