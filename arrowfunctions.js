// Arrow functions with two parameters

const sum = (para1, para2) => {
    return para1 + para2
};

console.log(sum(2,5))

const multi = (num1,num2)=>{
    return num1*num2
}
console.log(multi(2,5))

// Arrow functions with no parameters

const hello = () =>{
    console.log("hello")
};

hello()

// Arrow functions with single parameters

const checkWeight = para1 =>{
    console.log(`Baggage weight : ${para1} kilograms.`+ para1)
};

checkWeight(25)

const sub = (a,b) => a-b;
console.log(sub(10,5))


const divide = (a,b)  => a/b;
console.log(divide(20,5))

