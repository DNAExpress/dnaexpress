var Handlebars = require('handlebars');
var Path = require('path');
var fs = require('fs');
var event = require('./mail_templates/eventAlert');
var recommendation = require('./mail_templates/recommendationAlert');
var creatorAlert = require('./mail_templates/creatorAlert');
var nodemailer = require('nodemailer');

module.exports = {

  mail: function (creator, emailType, recipients, optionalEventName) {
    var data;

    if ('eventAlert' === emailType) {
      data = event;
    } else if ('recommendationAlert' === emailType) {
      data = recommendation;
    } else if ('creatorAlert' === emailType) {
      data = creatorAlert;
    } else {
      console.error('email type not found')
    }

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: process.env.GMAIL_ADDRESS,
          pass: process.env.PASS
      }
    });

    var template = Handlebars.compile(data),
    html = template({creator: creator, link: 'http://wefeast.org/', eventName: optionalEventName}),
    mailOptions = {
      from: '"WeFeast" <wefeastnotifications@gmail.com>', // sender address
      to: recipients, // list of receivers
      subject: 'WeFeast Event', // Subject line
      html: html,
      attachments: [{
        filename: 'cutlery.png',
        path: __dirname + '/cutlery.png',
        cid: '1234' //same cid value as in the html img src
      }]
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
    });

  }
};
