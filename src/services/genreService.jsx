import http from "./httpService";

//const endpoint = "http://localhost:3000/api/genres";
const apiEndpoint = "https://myrental-api.herokuapp.com/api/genres";

export function getGenres() {
  return http.get(apiEndpoint);
}
