const fs = require('fs');
const path = require('path');
const directoryName = process.argv[2];
const extensionType = '.' + process.argv[3];

function logFileNames(err, list){
    if (err){
        console.log(err);
        return err;
    }
    listLength = list.length
    for (let i = 0; i < listLength; i++){
        if (path.extname(list[i]) === extensionType){
            console.log(list[i]);
        }
    }
    return list;
};

fs.readdir(directoryName, logFileNames)
