const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../helpers.js')

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/pedidos.html'));
});

router.get('/count', async function (req, res, next) {
 db.queryDatabase(function(data){

    res.json(data)
  })
  
})



module.exports = router;
