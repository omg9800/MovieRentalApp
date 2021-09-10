import http from "./httpService";

//const apiEndpoint = "http://localhost:3000/api/users";
const apiEndpoint = "https://myrental-api.herokuapp.com/api/users";
const apiEndpoint2 = "https://myrental-api.herokuapp.com/api/auth";
//const apiEndpoint2 = "http://localhost:3000/api/auth";

export function registerform(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function loginform(user) {
  return http.post(apiEndpoint2, {
    email: user.username,
    password: user.password,
  });
}
