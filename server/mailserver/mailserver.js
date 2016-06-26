var Handlebars = require('handlebars');
var fs = require('fs');
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var hbs = require('nodemailer-express-handlebars');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var template;
var source = fs.readFile((__dirname + '/mailTemplates/eventAlert.html'), 'utf8', function(err, data){
  if (err) console.error(err);
  // return data;
  var template = Handlebars.compile(data);
  console.log(template({creator: "Nate"}))
});
// var template = Handlebars.compile(source);
// var html    = template(context);
// create reusable transporter object using the default SMTP transport
// var source =
module.exports = Mail = {
  log: function() {
    console.log(source);
  }
  // mail: function (creator) {
  //     console.log('hello');
  //     var transporter = nodemailer.createTransport('smtps://dnaexpress123%40gmail.com:projectDNA123@smtp.gmail.com');
  //     // ({
  //     //   service: 'Gmail',
  //     //   auth: {
  //     //     user: 'dnaexpress123@gmail.com',
  //     //     pass: 'projectDNA123'
  //     //   }
  //     // });
  //   transporter.use('compile', hbs({
  //     viewPath:'server/mailserver/mailTemplates',
  //     extName: '.html'
  //   }));

  //   // setup e-mail data with unicode symbols
  //   var mailOptions = {
  //       from: '"DNAExpress" <dnaexpress123.com>', // sender address
  //       to: 'blain89@gmail.com', // list of receivers
  //       subject: 'WeFeast Event', // Subject line
  //       // text: 'Hello world', // plaintext body
  //       html: {path: 'server/mailserver/mailTemplates/eventAlert.html'},
  //       // template: 'eventAlert',
  //       // html: 'Embedded image: <img src="cid:1234"/>',
  //       attachments: [{
  //         filename: 'dining-restaurants-1057448-1600x1200.jpg',
  //         path: __dirname + '/dining-restaurants-1057448-1600x1200.jpg',
  //         cid: '1234' //same cid value as in the html img src
  //       }],
  //       context: {
  //         creator: creator,
  //         link: 'http://localhost:8000'
  //       }
  //   };

  //   // send mail with defined transport object
  //   transporter.sendMail(mailOptions, function(error, info){
  //       if(error){
  //           return console.log(error);
  //       }
  //       console.log('Message sent: ' + info.response);
  //   });
  //     var sendPwdReminder = transporter.templateSender(new EmailTemplate('mailTemplates'), {
  //       from: 'dnaexpress123@gmail.com',
  //     });

  //     // use template based sender to send a message
  //     // sendPwdReminder({
  //     //     to: 'blain89@gmail.com',
  //     //     // EmailTemplate renders html and text but no subject so we need to
  //     //     // set it manually either here or in the defaults section of templateSender()
  //     //     subject: 'Password reminder',
  //     //     template: 'eventAlert'
  //     // }, function(err, info){
  //     //     if(err){
  //     //        console.log('Error');
  //     //     }else{
  //     //         console.log('Password reminder sent');
  //     //     }
  //     // });
  //   }
};

// Mail.mail('Nate');
Mail.log();
