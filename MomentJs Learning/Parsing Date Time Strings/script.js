// console.log("moment()", moment());
const m = moment();
console.log(`Original Moment: ${m.toString()}`);
m.utc(); //convert to utc from local
m.local(); //convert to local from utc
m.utcOffset(300); //change utc offset by 300 minutes(60minutesx5hours) is same as passing m.utcOffset(5);
console.log(`After Manipulation: ${m.toString()}`);
