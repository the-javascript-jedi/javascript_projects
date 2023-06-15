console.log("script js loaded");
var url = "BHP & Billion";
// replace Value
var replacedValue = url.replace(/&/g, "%26");
console.log("replacedValue", replacedValue);

// URL encoding
let uri = "https://w3schools.com/my test.asp?name=ståle&car=saab BHP&BIllion";
let encoded = encodeURIComponent(uri);
let decoded = decodeURIComponent(encoded);
console.log("encoded", encoded);
console.log("decoded", decoded);
