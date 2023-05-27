const argumentsLength = process.argv.length;

let total = 0;
for (let i = 2; i < argumentsLength; i++){
    total += Number(process.argv[i])
}

console.log(total)
