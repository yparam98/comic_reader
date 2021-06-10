const axios = require('axios').default;

exports.getXKCD = function (num) {
    if (num == null) {
        return new Promise((resolve, reject) => {
            axios.get('http://xkcd.com/info.0.json').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(err);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            axios.get('http://xkcd.com/' + num + '/info.0.json').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

// let current_issue = 0;

// let next_button = document.getElementById('next');
// let prev_button = document.getElementById('previous');
// let rand_button = document.getElementById('random');

// next_button.addEventListener('click', (event) => {
//     getOldXKCD(current_issue + 1).then((data) => {
//         fill_html(data);
//     }).catch((err) => {
//         // error getting next comic, display error
//     });
// });

// prev_button.addEventListener('click', (event) => {
//     getOldXKCD(current_issue - 1).then((data) => {
//         fill_html(data);
//     }).catch((err) => {
//         // error getting previous comic, display error
//     });
// });

// rand_button.addEventListener('click', (event) => {
//     let current_issue_number = 0;

//     getCurrentXKCD().then((data) => {
//         current_issue_number = data.num;
//     });

//     getOldXKCD(Math.floor(Math.random() * (current_issue_number - 1))).then((data) => {
//         fill_html(data);
//     }).catch((err) => {
//         // error getting random comic, display error
//     });
// });


// function getComic(num) {
//     let comic_data = null;

//     if (num == 0) {
//         getCurrentXKCD().then((data) => {
//             comic_data = data;
//         });
//     }
//     else {
//         getOldXKCD(num).then((data) => {
//             comic_data = data;
//         });
//     }

//     if (comic_data != null) {
//         current_issue = comic_data.num;
//     }

//     fill_html(comic_data);
// }

// function fill_html(data_obj) {
//     let title = document.getElementById('title');
//     let number = document.getElementById('number');
//     let comic_strip = document.getElementById('strip');
//     let date = document.getElementById('date');

//     title.textContent = data_obj.safe_title;
//     number.textContent = data_obj.num;
//     comic_strip.src = data_obj.img;
//     date.textContent = momentjs().year(data_obj.year).month(data_obj.month).date(data_obj.date).format('LL');
// }