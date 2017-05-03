var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'alice23305760@gmail.com',
        pass: 'alice841227'
    }
}));

var options = {
    from: 'alice23305760@gmail.com',
    to: 'a23305760@yahoo.com.tw',
    subject: '這是 node.js 發送的測試信件',
    html: '<h2>Alice</h2> <p>嗨嗨</p>'
};

transporter.sendMail(options, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('訊息發送: ' + info.response);
    }
});
