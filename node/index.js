// console.log("Hello");
const casual = require('casual');
console.log(casual.city, generateRandomNumber(), casual.name_suffix, casual.first_name, casual.last_name);

function generateRandomNumber() {
    return Math.floor(Math.random() * 11);
}

