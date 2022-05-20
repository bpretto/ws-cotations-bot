const axios = require('axios');

const hgApi = axios.create({
    baseURL: 'https://api.hgbrasil.com/finance'
});

export { hgApi };