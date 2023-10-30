// let plus = (num) => {
//     return num + 5;
// }

// let sum = plus;
// console.log(plus(5))
// console.log(sum(2))

//Call Back Functions
const isEven = (n) => { // definition 1. to check the number is even or not
    return n % 2 == 0;
} // definition

console.log(isEven(4))

let printMsg = (isEven, n) => { //definition 2. It prints a message that the number you have provided is even or not
    const isNumEven = isEven(n);
    console.log(`The number ${n} is an even number: ${isNumEven}`)
}

printMsg(isEven, 4)