const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))

app.use(express.static('public'))

const api = require('./api')
app.use('/api', api)

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
