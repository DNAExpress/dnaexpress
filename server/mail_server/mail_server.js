var Handlebars = require('handlebars');
var fs = require('fs');
var nodemailer = require('nodemailer');

module.exports = {

  mail: function (creator, link, templatePath, recipients) {

    var transporter = nodemailer.createTransport('smtps://dnaexpress123%40gmail.com:projectDNA123@smtp.gmail.com');

  //   // setup e-mail data with unicode symbols
    fs.readFile((__dirname + templatePath), 'utf8', function(err, data){
      if (err) console.error(err);

      var template = Handlebars.compile(data),
      html = template({creator: creator, link: link}),
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
    });
  }
};


