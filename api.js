const axios = require("axios");

let token = '486:ef5fd3944cd0d6e000000000000000000007ed9aa9939f984342209c89d74db5b51b1a97b070f7bf8f8a';

const api  = axios.create({
    baseURL: 'https://novacentral.rt.com.br/webservice/v1',
    timeout: 1000,
    headers:
        {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + new Buffer.from(token).toString('base64'),
            ixcsoft: 'listar'
        },

});
module.exports = api;
