import http from "./httpService";

//const apiEndpoint = "http://localhost:3000/api/rentals";
const apiEndpoint = "https://myrental-api.herokuapp.com/api/rentals";
export function getRentals() {
  return http.get(apiEndpoint);
}

export function getCustomer(customerId) {
  return http.get(apiEndpoint + "/" + customerId);
}

export function saveRental(data) {
  // if (customer._id) {
  //   const body = { ...customer };
  //   delete body._id;
  //   return http.post(apiEndpoint,);
  // }
  console.log(data);
  try {
    return http.post(apiEndpoint, data);
  } catch (ex) {
    console.log(ex);
  }
}

export function deleteCustomer(customerId) {
  return http.delete(apiEndpoint + "/" + customerId);
}
