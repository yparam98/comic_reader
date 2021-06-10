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