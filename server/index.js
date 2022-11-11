const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { sendEmail } = require('./sendEmail');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts', async (req, res) => {
  const userDetails = req.body;
  await sendEmail(userDetails);
  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
