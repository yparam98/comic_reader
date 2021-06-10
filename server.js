const port = 5000;

const express = require('express');
const app = express();
const path = require('path');
const momentjs = require('moment');
const service = require('./data-service.js');
const fs = require('fs');
const { request } = require('http');
const { response } = require('express');
const { rejects } = require('assert');
// const build = require('./build.js');

app.listen(port, () => {
    console.log("Express server listening on port ", port);
});

// get today's comic
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/views/comic.html'));
});

// get comic by number
app.get('/:num', (request, response) => {
    response.sendFile(path.join(__dirname, '/views/comic.html'));
});

app.get('/api/getXKCD', (request, response) => {
    let comic_object = {};
    let error = null;

    try {
        if (request.query.num == null) {
            service.getCurrentXKCD().then((data) => {
                comic_object = {
                    "num": data.num,
                    "title": data.safe_title,
                    "link": data.img,
                    "date": momentjs().year(data.year).month(data.month).date(data.day).format('LL')
                };
            }).catch((err) => {
                throw err;
            });
        } else {
            service.getOldXKCD(request.query.num).then((data) => {
                comic_object = {
                    "num": data.num,
                    "title": data.safe_title,
                    "link": data.img,
                    "date": momentjs().year(data.year).month(data.month).date(data.day).format('LL')
                };
            }).catch((err) => {
                throw err;
            });
        }

        fs.appendFile(path.join(__dirname, '/counter.dat'), comic_object.num); // write the comic num to file

        response.send(comic_object);
    } catch (err) {
        response.status(500).send(err);
    }
});

app.get('/api/getViews', (request, response) => {
    fs.readFile(path.join(__dirname, '/counter.dat'), (err, data) => {
        console.log(data);
    }); // write the comic num to file
});