//fetch("http://localhost:3000/faves").then(x => x.text()).then(y => console.log(y));

// const ClientConnection = require("./ClientConnection");
// // "BQD3X_BPJuJJ4dYBmvGPgtZLgir0nqoNRh-z88XrTOD9G77ukBmzpUcbKA8qVk5Y_3z_r8dmtio6w3jnHDC4eRJmyfhaUiutDpUHtYmvNVZbRW4ZnZ10GRPpVfMZq-xAjPbzHdjhPvFjb9J04KRcqSHLXc_4cRbMgLLEL9xpfzJ1wZXsSI2hqJdamryp"
api = 
async function fetchData() {
  try {
    const accessToken =
      "BQAS2txZsJTMHWL4fF29OnTJ8G59wI22ADYybo5RUIKwBYCn3TSxtxNUqE_y0g0PrDezYhsS93QtJrhGbZAPcNV3NWou_WTQI5jc1grIEFcU82ekVEkecRLfwZ3fvvIZcvo_yQzzRr5vn_7T2T3qIeu4lyMg-K_LJEk61Wgr30F8H0f8kwKxx8SIGRQv"; // Replace with your actual access token
    const response = await fetch("http://localhost:3000/faves", {
      headers: {
        Authorization: 'Bearer '
      },
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function findSongs(token, search_query) {
    let result = await api.request({
        method: "get",
        url: "https://api.spotify.com/v1/search",
        headers: { 'Authorization': 'Bearer ' + token },
        params: { 'q': search_query, 'type': 'track' }
    }).catch(async function handleError(err) {
        console.log(err)
        let refreshed_token = await refreshToken(username)
        let result_new = await findSongs(username, refreshed_token, search_query)
        console.log(result_new)
        return result_new.data.tracks
    })
    return result.data.tracks
}

accessTok =
  "BQAS2txZsJTMHWL4fF29OnTJ8G59wI22ADYybo5RUIKwBYCn3TSxtxNUqE_y0g0PrDezYhsS93QtJrhGbZAPcNV3NWou_WTQI5jc1grIEFcU82ekVEkecRLfwZ3fvvIZcvo_yQzzRr5vn_7T2T3qIeu4lyMg-K_LJEk61Wgr30F8H0f8kwKxx8SIGRQv";
search_query = "Magnetic";
console.log(findSongs(accessTok, search_query));

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