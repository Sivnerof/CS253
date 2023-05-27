const fs = require('fs')
const fileName = process.argv[2]
const buffer = fs.readFileSync(fileName)
const fileAsStrings = buffer.toString()
const newLines = fileAsStrings.split('\n')
const lines = newLines.length - 1
console.log(lines)
