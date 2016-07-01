var Handlebars = require('handlebars');
var Path = require('path');
var fs = require('fs');
var event = require('./mail_templates/eventAlert');
var recommendation = require('./mail_templates/recommendationAlert');
var creatorAlert = require('./mail_templates/creatorAlert');
var nodemailer = require('nodemailer');

module.exports = {

  mail: function (creator, email, recipients, optionalEventName) {
    console.log('type of alert', email)
        console.log('creator', creator)
            console.log('recipients', recipients)
                console.log('optionalEventName', optionalEventName)
    var data;

    if ('eventAlert' === email) {
      data = event;
    } else if ('recommendationAlert' === email) {
      data = recommendation;
    } else if ('creatorAlert' === email) {
      data = creatorAlert;
    } else {
      console.error('email type not found')
    }


    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'dnaexpress123@gmail.com',
          pass: 'projectDNA123'
      }
    });
    console.log('data', data)
      var template = Handlebars.compile(data),
      html = template({creator: creator, link: 'http://localhost:8000/', event: optionalEventName}),
      mailOptions = {
        from: '"DNAExpress" <dnaexpress123.com>', // sender address
        to: recipients, // list of receivers
        subject: 'WeFeast Event', // Subject line
        html: html,
        attachments: [{
          filename: 'dining-restaurants-1057448-1600x1200.jpg',
          path: __dirname + '/dining-restaurants-1057448-1600x1200.jpg',
          cid: '1234' //same cid value as in the html img src
        }]
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
    // });
  }
};
