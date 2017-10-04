const express = require('express')
const router = express.Router()
const Group = require('../models/group')

router.get('/', (req,res)=>{
  Group.findAll()
  .then(dataGroups => {
    res.render('groups',{dataGroups:dataGroups})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', (req,res)=>{
  Group.findAll()
  .then(dataGroups=>{
    res.render('add_groups',{dataGroups:dataGroups})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Group.add(req)
  .then(dataGroups=>{
    res.redirect('/groups')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  Group.delete(req)
  .then(dataGroups=>{
    res.redirect('/groups')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Group.findById(req)
  .then(groups=>{
    res.render('edit_groups',{dataGroups:groups[0]})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Group.edit(req)
  .then(groups=>{
    res.redirect('/groups')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
