import http from "./httpService";

//const apiEndpoint = "http://localhost:3000/api/customers";
const apiEndpoint = "https://myrental-api.herokuapp.com/api/customers";
const apiEnd = "https://myrental-api.herokuapp.com/api/customer_movies";
//const apiEnd = "http://localhost:3000/api/customer_movies";

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function getMovies(customerId) {
  var k = http.get(apiEndpoint + "/" + customerId);
  return k.movies;
}

export function getCustomer(customerId) {
  return http.get(apiEndpoint + "/" + customerId);
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(apiEndpoint + "/" + customer._id, body);
  }
  return http.post(apiEndpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(apiEndpoint + "/" + customerId);
}

export function deleteMovie(movieId, customerId) {
  console.log(movieId, customerId);
  const body = { mid: movieId, cid: customerId };
  console.log(body);
  return http.put(apiEnd, body);
}
