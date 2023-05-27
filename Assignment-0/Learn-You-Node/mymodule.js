module.exports = function (directory, extension, callback) {
    const fs = require('fs');
    const path = require('path');
    extension = '.' + extension;
    fs.readdir(directory, function (err, data){
        if (err){
            return callback(err);
        }
        const dataLength = data.length;
        const filteredList = [];
        for (let i = 0; i < dataLength; i++){
            if (path.extname(data[i]) === extension){
                filteredList.push(data[i]);
            }
        }
        return callback(null, filteredList);
    });
}
