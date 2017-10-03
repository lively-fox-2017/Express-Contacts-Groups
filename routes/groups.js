const express = require('express')
const router = express.Router()
const Group = require('../models/groups')

router.get('/', function(req,res) {
  Group.getDataGroup((rows) => {
    res.render('groups', {dataGroups: rows})
  })
})

router.get('/addgroups', function(req,res) {
  Group.getDataGroup(() => {
    res.render('addgroups')
  })
})

router.post('/addgroups', function(req,res) {
  Group.addDataGroup(req.body, () => {
    res.redirect('/groups')
  })
})

router.get('/delete/:id', function(req,res) {
  Group.deleteDataGroup(req.params.id, () => {
    res.redirect('/groups')
  })
})

router.get('/edit/:id', function(req,res) {
  Group.findDataById(req.params.id, (rows) => {
    res.render('editgroups', {dataGroups: rows})
    // res.send(rows)
  })
})

router.post('/edit/:id', function(req,res) {
  Group.editDataGroup(req.body, req.params.id, () => {
    res.redirect('/groups')
  })
})


module.exports = router
