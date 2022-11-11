const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

async function sendEmail(data) {
  const {
    name,
    bankName,
    paymentMode,
    your_emi,
    location: { emi, email },
  } = data;
  const doc = new PDFDocument();
  const invoiceName = `${data.location.firstName}_invoice.pdf`;
  const date = new Date().toLocaleString();

  doc
    .fontSize(25)
    .text('Payment details', 100, 140)
    .font('Times-Roman', 13)
    .moveDown()
    .text(`Name: ${name}`)
    .text(`EMI Paid: ${your_emi}`)
    .text(`Balance amount: ${emi - your_emi}`)
    .text(`Date & Time: ${date}`)
    .text(`Mode of Payment: ${paymentMode}`)
    .text(`Bank Name: ${bankName}`);
  doc.end();

  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: `${email}`,
    subject: 'Payment successful ✔',
    text: `Hi ${name}, We have received your payment of ${your_emi} successfully.`,
    html: `Hi <b>${name}</b>, We have received your payment of ${your_emi} successfully.`,
    attachments: [
      {
        filename: invoiceName,
        content: doc,
      },
    ],
  });
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = {
  sendEmail,
};
