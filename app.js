const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('db/database.db');
let Contact = require('./models/contacts')
let Group = require('./models/groups')
let Profile = require('./models/profiles')
let Address = require('./models/addresses')

//
//
// let index = require('./routes/index.js')
// let contacts = require('./routes/contacts.js');
// let groups = require('./routes/groups.js');
// let addresses = require('./routes/addresses.js');
// let profile = require('./routes/profiles.js');
//
// app.use('/',index);
// app.use('/contacts',contacts);
// app.use('/groups',groups);
// app.use('/addresses',addresses);
// app.use('/profiles',profile);




app.get('/', function(req, res) {
  res.render('index');
})
// ===============CONTACTS================
//1.View Contacts
app.get('/contacts', function(req, res) {
  Contact.viewContacts(function(err, rows) {
    res.render('contacts', {
      dataContacts: rows
    })
  })
})
//2.Add Contacts
app.post("/contacts", function(req, res) {
  Contact.addContacts(req.body, function() {
    res.redirect("/contacts")
  })
})
//3.Delete Contacts
app.get("/contacts/delete/:id", function(req, res) {
  Contact.deleteContacts(req.params, function() {
    res.redirect("/contacts")
  })
})
// 4.Edit Contacts (MAINTENANCE)
app.get("/contacts/edit/:id", function(req, res) {
  Contact.geteditContacts(req.params, function(err, rows) {
    if (!err) {
      res.render('contacts_edit', {
        data: rows[0]
      })
    } else {
      res.send('Error')
    }
  })
})

app.post("/contacts/edit/:id", (req, res) => {
  Contact.posteditContacts(req.body, req.params, function(err,rows) {
    if (!err) {
      res.redirect("/contacts")
    } else {
      res.send("Error")
    }
  })
})

app.get("/contacts/addresses/:id", function(req, res) {
  Contact.geteditContactsAddress(req.params, function(err,dataAlamat){
    if(!err){
      Contact.viewContacts(function(err, dataContacts) {
      res.render('address_view', {dataAlamat:dataAlamat, dataContacts:dataContacts})
    })
  }
  })
})

// ================GROUPS===================
//1.View Groups
app.get('/groups', function(req, res) {
  Group.viewGroups(function(err, rows) {
    res.render('groups', {
      dataGroups: rows
    });
  })
})
//2.Add Groups
app.post("/groups", function(req, res) {
  Group.addGroups(req.body, function() {
    res.redirect("/groups")
  })
})
//3.Delete Contacts
app.get("/groups/delete/:id", function(req, res) {
  Group.deleteGroups(req.params, function() {
    res.redirect("/groups")
  })
})

app.get("/groups/edit/:id", function(req, res) {
  Group.geteditGroups(req.params, function(err, rows) {
    if (!err) {
      res.render('groups_edit', {
        data: rows[0]
      })
    } else {
      res.render('groups_edit',{data:rows,err})
    }
  })
})

app.post("/groups/edit/:id", (req, res) => {
  Group.posteditGroups(req.body, req.params, function(err) {
    if (!err) {
      res.redirect("/groups")
    } else {
      res.send("Error")
    }
  })
})
// ================PROFILE===================
//1.View Profiles
app.get('/profiles', function(req, res) {
  Profile.viewProfiles(function(err, rows) {
    if (!err) {
      Contact.viewContacts((err, dataContacts) => {
        res.render('profiles', {dataProfiles: rows,dataContacts: dataContacts,errData: null});
      })
    }
  })
})
//2.Add Profiles
app.post("/profiles", function(req, res) {
  Profile.addProfile(req.body, function(err, rows) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        Profile.viewProfiles(function(err, rows) {
          if (!err) {
            Contact.viewContacts((err, dataContacts) => {
              res.render('profiles', {dataProfiles: rows, dataContacts: dataContacts,errData: 'ID Sudah Digunakan'});
            })
          }
        })
      } else {
        res.redirect("/profiles")
      }
  })
})
// 3.Delete Profiles
app.get("/profiles/delete/:id", function(req, res) {
  Profile.deleteProfile(req.params, function() {
    res.redirect("/profiles")
  })
})

app.get("/profiles/edit/:id", function(req, res) {
  Profile.geteditProfiles(req.params, function(err, rows) {
    if (!err) {
      Contact.viewContacts(function(err, data) {
        res.render('profiles_edit', {
          dataProfiles: rows[0],
          dataContacts: data,
          errData:null
        })
      })

    } else {
      res.send('Error')
    }
  })
})

app.post("/profiles/edit/:id", function(req, res) {
  console.log('12asdsa21');
  Profile.posteditProfiles(req.body, req.params, function(err) {
    if (err) {
      console.log('ada errror');
      Profile.geteditProfiles(req.params, function(err, rows) {
        if (!err) {
          Contact.viewContacts(function(err, data) {
            res.render('profiles_edit', {
              dataProfiles: rows[0],
              dataContacts: data,
              errData: 'ID Sudah Digunakan'
            })
          })
        }
      })
    } else {
      res.redirect("/profiles")
    }
  })
})

// ================ADDRESSES===================
app.get('/addresses', function(req, res) {
  Address.viewAddresses(function(err, rows) {
    if(!err){
      Contact.viewContacts(function(err,dataContacts){
        res.render('addresses', {
          dataAddresses: rows,
          dataContacts : dataContacts
        });
      })
    }
  })
})

app.post('/addresses', function(req, res) {
  Address.addAddresses(req.body, function() {
    res.redirect("/addresses")
  })
})

app.get('/addresses/delete/:id', function(req, res) {
  Address.deleteAddresses(req.params, function() {
    res.redirect("/addresses")
  })
})

app.get("/addresses/edit/:id", function(req, res) {
  Address.geteditAddresses(req.params, function(dataAddresses, dataContacts) {
      res.render('addresses_edit', {
        dataAddresses: dataAddresses[0],dataContacts:dataContacts
      })
  })
})

app.post("/addresses/edit/:id", function(req, res) {
  Address.posteditAddresses(req.body, req.params, function(err) {
    if (!err) {
      res.redirect("/addresses")
    } else {
      res.send("Error")
    }
  })
})

app.listen(3000, function() {
  console.log('Sudah terhubung ke Port 3000')
})
