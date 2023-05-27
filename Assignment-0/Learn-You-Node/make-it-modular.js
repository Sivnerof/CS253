const mymodule = require('./mymodule.js');
const directory = process.argv[2];
const extension = process.argv[3];

function logFileNames(err, list){
    if (err){
        console.log(err);
        return err;
    }
    const listLength = list.length;
    if (list){
        for (let i = 0; i < listLength; i++){
            console.log(list[i]);
        }
        return list;
    }
};

mymodule(directory, extension, logFileNames)
