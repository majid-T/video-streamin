const express = require('express')
const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8000, () => {
    console.log("App is running on 8000")
})