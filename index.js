const express = require('express')
const app = express();
const fs = require('fs');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});


app.get('/video', function (req, res) {
    const rangeHeader = req.headers.range;
    if (!rangeHeader) {
        res.status(400).send("Range header not found!")
    }

    // This video is 3 MB for Githup purposes try a larger one for your code -- Majid-T
    const videoPath = 'video1.mp4';
    const videoSize = fs.statSync(videoPath).size;
    console.log(videoSize)

    // Calculating the range and data to sent
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(rangeHeader.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    //Setting headers
    const contentLenght = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLenght,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
});


app.listen(8000, () => {
    console.log("App is running on 8000")
})