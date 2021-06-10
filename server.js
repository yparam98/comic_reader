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

var exec = require('child_process').exec;

app.listen(port, () => {
    console.log("Express server listening on port ", port);
});

app.use(express.static('public'));

// get today's comic
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/views/comic.html'));
});

// get comic by number
app.get('/comic/:num', (request, response) => {
    response.sendFile(path.join(__dirname, '/views/comic.html'));
});

app.get('/api/getXKCD', (request, response) => {
    try {
        service.getXKCD(request.query.num).then((data) => {
            fs.appendFile(path.join(__dirname, '/counter.dat'), (data.num.toString() + '\n'), (file_error) => {
                if (file_error) {
                    throw file_error;
                } else {
                    exec('grep -c ' + path.join(__dirname, '/counter.dat') + ' ' + data.num.toString(), (exec_error, exec_data) => {
                        if (exec_error) {
                            throw exec_error;
                        } else {
                            response.send({
                                "num": data.num,
                                "title": data.safe_title,
                                "link": data.img,
                                "date": momentjs().year(data.year).month(data.month).date(data.day).format('LL'),
                                "views": exec_data.split(' ')[0]
                            });
                        }
                    });
                }
            });
        }).catch((promise_error) => {
            throw promise_error;
        });
    } catch (caught_error) {
        response.status(500).send(caught_error);
    }
});

app.get('/api/getViews', (request, response) => {
    fs.readFile(path.join(__dirname, '/counter.dat'), (err, data) => {
        if (err) {
            response.status(500).send(err);
        } else {
            response.send(data);
        }
    });
});