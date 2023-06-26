
// Import the OAuth library
// import OAuth from 'oauth-1.0a';
// console.log("OAuth",OAuth)
// Create an instance of the OAuth library
const oauth = OAuth({
  consumer: {
    key: '0fe2485c-46e0-431c-b3ea-7e6ee41e83d7',
    secret: 'qXwi66sBwIfBQWPm1fh51YZNlG9wbP7i'
  },
  signature_method: 'HMAC-SHA1',
  // hash_function(base_string, key) {
  //   return crypto.createHmac('sha1', key)
  //     .update(base_string)
  //     .digest('base64');
  // }
  hash_function(base_string, key) {
    var hash = CryptoJS.SHA1(base_string);

    return hash
  }
  //random
  // hash_function(base_string, key) {
  //   return crypto.randomUUID()
  // }
});

// Set up the request parameters
const request = {
  url: 'https://cdetsng.cisco.com/wsapi/latest/api',
  method: 'GET', // or 'POST', 'PUT', etc.
  data: 'search?criteria=([Submitted-on] >= \'01/01/2010\') &fields=Severity,Status&count=10&start=99990' // additional parameters for the request
};

// Generate the OAuth 1.0 header
const headers = oauth.toHeader(oauth.authorize(request));


fetch("https://cdetsng.cisco.com/wsapi/latest/api/search?criteria=([Submitted-on] >= '01/01/2010') &fields=Severity,Status&count=10&start=99990", {
  mode: "cors",
  cache: "no-cache",
  credentials: "include",
  headers: headers,
})
  .then((resp) => resp.json())
  .then((json) => console.log("JSON.stringify(json)",JSON.stringify(json)));


function callNanme(){
  console.log("hellow")
}
callNanme()

