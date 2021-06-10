window.onload = function () {
    let url = window.location.href.split('/');
    let issue = url[url.length - 1];

    getComic(issue);
}

function getComic(issue) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        fill_html(JSON.parse(this.responseText));
    }

    // console.log(window.location.origin + "/api/getXKCD?num=" + issue);
    if (issue == "") {
        xhttp.open("GET", window.location.origin + "/api/getXKCD", true);
    } else {
        xhttp.open("GET", window.location.origin + "/api/getXKCD?num=" + issue, true);
    }

    xhttp.send();
}

function fill_html(data_obj) {
    // let prev_button = document.getElementById('previous');
    // let rand_button = document.getElementById('random');

    let title = document.getElementById('title');
    let comic_strip = document.getElementById('strip');
    let date = document.getElementById('date');
    let counter = document.getElementById('counter');

    title.textContent = data_obj.num + ": " + data_obj.title;
    comic_strip.src = data_obj.link;
    date.textContent = data_obj.date;
    counter.textContent = data_obj.views + " views";

    // document.getElementById('next').addEventListener('click', (event) => {
    //     console.log("next button clicked!");
    // });    

    // prev_button.href = (window.location.href + "/" + (data_obj.num - 1));
    // rand_button.href = (window.location.href + "/" + (Math.floor(Math.random() * (data_obj.num - 1))));
}