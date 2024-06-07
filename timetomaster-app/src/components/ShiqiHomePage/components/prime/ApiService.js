// ApiService.js
import axios from 'axios';

class ApiService {
  static openPrime() {
    return axios.put('http://localhost:9001/customers/64c6f06a35424eb2de0d1e57/openPrime');
  }
  static closePrime() {
    return axios.put('http://localhost:9001/customers/64c6f06a35424eb2de0d1e57/closePrime');
  }
}

export default ApiService;
