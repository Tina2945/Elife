var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'nccumis.elife@gmail.com',
        pass: 'kmlab0049'
    }
}));

module.exports = transporter;
