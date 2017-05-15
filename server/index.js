const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(compression());
app.use('/fi', express.static(__dirname + '/../dist/fi'));
app.use('/sv', express.static(__dirname + '/../dist/sv'));
app.listen(port);

app.get('/fi/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/fi/index.html'));
});
app.get('/sv/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/sv/index.html'));
});
console.log(`Server listening on ${port}`);
