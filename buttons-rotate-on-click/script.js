var l = "2222";
// value 5 is not present in the arrays - center value
//a array is for calculating the button text
var a = ["1", "2", "3", "6", "9", "8", "7", "4"];
//b array is for getting the id of the button
var b = ["1", "2", "3", "6", "9", "8", "7", "4"];

var rotate = function() {
    // decrementing for loop
    for (var i = 7; i > 0; i--) {
        a[i] = a[i - 1];
    }
    //set the starting position as l
    a[0] = l;
    // set the l value as last value
    l = a[7];
    //set the value of the button
    for (var i = 0; i < 8; i++) {
        console.log("b[i]",b[i]);
        document.getElementById("btn" + b[i]).innerText = a[i];
    }

}