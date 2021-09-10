import http from "./httpService";

//const apiEndpoint = "http://localhost:3000/api/auth";
const apiEndpoint = "https://myrental-api.herokuapp.com/api/auth";

export function login(email, password) {
  return http.post(apiEndpoint, {
    email,
    password,
  });
}
