let current_issue = 0;

let next_button = document.getElementById('next');
let prev_button = document.getElementById('previous');
let rand_button = document.getElementById('random');

next_button.addEventListener('click', (event) => {
    console.log(window.location.href);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        fill_html(this.responseText);
    }
    xhttp.open("GET", window.location.href + "api/getXKCD", true);
    xhttp.send({num: (current_issue + 1)});
});

prev_button.addEventListener('click', (event) => {
    // xhttp.onload = function () {
    //     fill_html(this.responseText);
    // }
    // xhttp.open("GET", "/api/getXKCD/" + current_issue - 1, true);
    // xhttp.send();
});

rand_button.addEventListener('click', (event) => {
    // xhttp.onload = function () {
    //     fill_html(this.responseText);
    // }
    // xhttp.open("GET", "/api/getXKCD/" + (Math.floor(Math.random() * (100 - 1))), true);
    // xhttp.send();
});

function fill_html(data_obj) {
    let title = document.getElementById('title');
    let number = document.getElementById('number');
    let comic_strip = document.getElementById('strip');
    let date = document.getElementById('date');

    title.textContent = data_obj.safe_title;
    number.textContent = data_obj.num;
    comic_strip.src = data_obj.link;
    date.textContent = data_obj.date;
}