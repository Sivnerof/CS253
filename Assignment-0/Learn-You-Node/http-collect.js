const http = require('http');
const url = process.argv[2];

http.get(url, (res) => {
    res.setEncoding('utf-8');
    let allData = '';
    let characters = 0;
    res.on('data', (data) => {
        characters += data.length;
        allData += data;
    });
    res.on('end', () => {
        console.log(characters);
        console.log(allData);
    });
});

