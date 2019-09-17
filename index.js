const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  const readStream = fs.createReadStream('./primes.dat.gz');
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Cache-Control', 'max-age=86400');
  readStream.pipe(res);
});

app.listen(80);
