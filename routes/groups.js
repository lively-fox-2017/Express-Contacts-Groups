const express = require('express')
const router = express.Router()
const Group = require('../models/groups')

router.get('/', function(req,res) {
  Group.findAll()
  .then(dataGroup => {
    res.render('groups/groups', {dataGroup: dataGroup})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  Group.findAll()
  .then(dataGroup => {
    res.render('groups/add', {dataGroup: dataGroup})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/add', function(req,res) {
  Group.createGroup(req)
  .then(dataGroup => {
    res.redirect('/groups')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', function(req,res) {
  Group.deleteGroup(req)
  .then(dataGroup => {
    res.redirect('/groups')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Group.findById(req)
  .then(dataGroup => {
    res.render('groups/edit', {dataGroup: dataGroup[0]})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Group.updateGroup(req)
  .then(dataGroup => {
    res.redirect('/groups')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
