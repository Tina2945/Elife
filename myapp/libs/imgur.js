var imgur = require('imgur');

imgur.setClientId('136751af24b4bb0');
imgur.getClientId();

imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.getAPIUrl();

imgur.setCredentials('nccumis.elife@gmail.com', 'kmlab0049', '136751af24b4bb0');

module.exports = imgur;
