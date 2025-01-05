
var nodemailer = require('nodemailer');  


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "opsc1950@gmail.com",
    pass: "ecih qcme weof nejy",
  }
});

var mailOptions = {
  from: 'opsc1950@gmail.com',
  to: 'opsc1950@gmail.com, vijaychauhan0056@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});