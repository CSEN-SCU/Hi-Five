//fetch("http://localhost:3000/faves").then(x => x.text()).then(y => console.log(y));

// const ClientConnection = require("./ClientConnection");
// // "BQD3X_BPJuJJ4dYBmvGPgtZLgir0nqoNRh-z88XrTOD9G77ukBmzpUcbKA8qVk5Y_3z_r8dmtio6w3jnHDC4eRJmyfhaUiutDpUHtYmvNVZbRW4ZnZ10GRPpVfMZq-xAjPbzHdjhPvFjb9J04KRcqSHLXc_4cRbMgLLEL9xpfzJ1wZXsSI2hqJdamryp"
async function fetchData() {
  try {
    const accessToken = "BQCGctYYKmF7y1sGzW3UCRZ2Jr1jV3zMyDLBgQALfIcwQqECUT_R0eRe5uCB-UV0PD_hIFVZI7lO2gofC-yMR3CiXaNF0fC24GCKLSrF5sZ_9cuwiAXaOYfGA4jkxmKNgzEmvBmjGClwF6joWJfxPbNI1TfEz_PfxzwwklTra_ZnptRA4Ugf0nvtLEey"; // Replace with your actual access token
    const response = await fetch('http://localhost:3000/faves', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Optionally set other headers as needed
      }
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
// const fetch = (...args) =>
// 	import('node-fetch').then(({default: fetch}) => fetch(...args));

// const axios = require('axios');

// // Define the URL of your Express server
// //the url has different pages, which calls different api's
// const baseURL = 'http://localhost:3000/faves';
// // Define your access token
// const accessToken = "BQBOUXidaFKewJXPiliTCuX_U3Zl0IexjEbU8xVQvxjECJALlp7evH1DDlQo0KcEj0j_w6_ntCg6_AjSKme-VhOevLCtrIlOqZnjafjthMP1ikCtrh57S3qkC2hg5QczfvJidcVU7p-WiEYCk_EK4iHFmPaVLOLgbo2IhjCWtgRkPDq7voXLtKadaH60";

// // Set up the Axios instance with default headers including the access token
// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     'Authorization': `Bearer ${accessToken}`
//   }
// });

// // Make a GET request to the root path
// axiosInstance.get(baseURL)
//   .then(response => {
//     // Handle the response
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     // Handle errors
//     console.error('Error:', error);
//   });

// const fetch = require('node-fetch');
// const ClientConnection = require("./ClientConnection");
// const accessToken = "BQAeBR-T3laGrJx8F5Ukk_9cBFkhnTSq4RQKX65WZRcsJRgWPIwgNQx2P-ySqIoKKfrSJm--I-PHKJ58f7WlmzjrP0iugU8PGJWYOHtQLrf1lxNZpytQezKUKyjcBkh-YcdNycTzIpoOyz3o-Lz3CoKRJVkfNElKbv6zZJ8yhOcOAOJ86FcjljH3lh3O";

// fetch('http://localhost:3000/faves', {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${accessToken}`
//   }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));