const express = require('express')
const router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

router.get('/groups', function(req,res){

  db.all(`SELECT * FROM groups`, (err, data) =>{
    if(err){
      console.log(err)
    }else {
      res.render('groups', {data:data})
    }
  })
})

module.exports = router;
