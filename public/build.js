let new_issue = false;

window.onload = function () {
    let url = window.location.href.split('/');
    issue = parseInt(url[url.length - 1]);


    getComic(issue);
}

function getComic() {
    console.log(issue);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        fill_html(JSON.parse(this.responseText));
    }

    if (isNaN(issue)) {
        xhttp.open("GET", window.location.origin + "/api/getXKCD", true);
        new_issue = true;
    } else {
        xhttp.open("GET", window.location.origin + "/api/getXKCD?num=" + issue, true);
    }

    xhttp.send();
}

function fill_html(data_obj) {
    let title = document.getElementById('title');
    let comic_strip = document.getElementById('strip');
    let date = document.getElementById('date');
    let counter = document.getElementById('counter');

    title.textContent = data_obj.num + ": " + data_obj.title;
    comic_strip.src = data_obj.link;
    date.textContent = data_obj.date;
    counter.textContent = data_obj.views + " views";

    document.getElementById('next').addEventListener('click', (event) => {
        if (!new_issue) {
            window.location.replace(window.location.origin + "/comic/" + (data_obj.num + 1));
        }
    });

    document.getElementById('previous').addEventListener('click', (event) => {
        if (data_obj.num != 0) {
            window.location.replace(window.location.origin + "/comic/" + (data_obj - 1));
        }
    });

    document.getElementById('random').addEventListener('click', (event) => {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            window.location.replace(window.location.origin + "/comic/" + (Math.floor(Math.random() * JSON.parse(this.responseText).num) + 1));
        }
        xhttp.open("GET", window.location.origin + "/api/getXKCD", true);
        xhttp.send();
    });
}