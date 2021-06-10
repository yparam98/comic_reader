const axios = require('axios').default;

exports.getXKCD = function (num) {
    return new Promise((resolve, reject) => {
        if (num == null) {
            axios.get('http://xkcd.com/info.0.json').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        } else {
            axios.get('http://xkcd.com/' + num + '/info.0.json').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        }
    });
}