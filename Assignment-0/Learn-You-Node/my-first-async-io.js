const fs = require('fs')
const fileName = process.argv[2]

fs.readFile(fileName, 'utf-8', function doneReading(err, fileContents){
    if (!err){
        newLines = fileContents.split('\n')
        lineCount = newLines.length - 1
        console.log(lineCount)
    }
})
