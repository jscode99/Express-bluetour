const key = require("../key");
const { SMTPClient } = require("emailjs");

// Creating a client object
const client = new SMTPClient({
  user: key.SMTPSERVER.user,
  password: key.SMTPSERVER.password,
  host: key.SMTPSERVER.host,
  ssl: key.SMTPSERVER.ssl,
});

const sendEmail = (text, to, subject) => {
  // send the message and get a callback with an error or details of the message that was sent
  return new Promise((resolve, reject) => {
    client.send(
      {
        text: text,
        from: "Bluetours <jishnusatheesh27@gmail.com>",
        to: to,
        subject: subject,
      },
      (err, message) => {
        console.log(message);
        if (err) reject(err);
        resolve(message);
      },
    );
  });
};

module.exports = {
  sendEmail,
};
