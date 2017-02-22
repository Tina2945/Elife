var imgur = require('imgur');

imgur.setClientId('5ea4351d7af79ec'); 
imgur.getClientId();

imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.getAPIUrl();

imgur.setCredentials('alice23305760@gmail.com', 'alice123456', '5ea4351d7af79ec');

module.exports = imgur;