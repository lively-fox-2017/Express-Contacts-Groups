const express = require('express')
const router = express.Router()
const Group = require('../models/groups')

router.get("/", function(req, res) {
  Group.viewGroups(function(err, rows) {
    // res.render('groups', {dataGroups: rows});
    res.send(rows)
  })
})
//2.Add Groups
router.post("/", function(req, res) {
  Group.addGroups(req.body, function() {
    res.redirect("/groups")
  })
})
//3.Delete Contacts
router.get("/delete/:id", function(req, res) {
  Group.deleteGroups(req.params, function() {
    res.redirect("/groups")
  })
})

router.get("/edit/:id", function(req, res) {
  // console.log('asdfs');
  Group.geteditGroups(req.params, function(err, rows) {
    if (!err) {
      res.render('groups_edit', {data: rows[0]})
    } else {
      res.send(err)
    }
  })
})

router.post("/edit/:id", (req, res) => {
  Group.posteditGroups(req.body, req.params, function(err) {
    if (!err) {
      res.redirect("/groups")
    }
  })
})

module.exports = router
