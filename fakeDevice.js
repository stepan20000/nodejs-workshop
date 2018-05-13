const express = require("express");
const app = express();

const port = parseInt(process.argv[2]);

app.get('/cm', (req, res) => {
  const cmnd = req.query.cmnd;
  console.log(`${cmnd} -- ${port}`);
  res.sendStatus(200);
});

app.listen(port, function(err){
  if(!err){
    console.log(`Fake device is listening on 127.0.0.1:${port}`)
  }
});