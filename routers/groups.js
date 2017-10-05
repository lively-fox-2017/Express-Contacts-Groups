// express
const express = require('express');
const app = express();
const router = express.Router();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import model group
const Group = require('../models/groups');

router.get('/groups', function(req, res){
  Group.getAllGroups().then((rows) => {
    res.render('groups/index', {groups: rows});
  });
});

router.get('/groups/edit/:id', function(req, res){
  Group.getByIDGroup(req.params.id).then((rows) => {
    res.render('groups/edit', {groups: rows});
  });
});

router.post('/groups', function(req, res){
  Group.insertGroup(req.body.name_of_group).then((rows) => {
    res.redirect('/groups');
  });
});

router.post('/groups/edit/:id', function(req, res){
  Group.updateGroup(req.body.name_of_group, req.params.id).then((rows) => {
    res.redirect('/groups');
  });
});

router.get('/groups/delete/:id', function(req, res){
  Group.deleteGroup(req.params.id).then((rows) => {
    res.redirect('/groups');
  });
});

module.exports = router;