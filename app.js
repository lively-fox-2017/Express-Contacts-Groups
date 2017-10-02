const Express = require('express');
const app = Express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

function joinConjuction(cb) {
  db.all('select Contacts.id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email, Contact_Groups.Group_ID, Groups.name_of_group from Contacts join Contact_Groups on Contacts.id = Contact_Groups.Contact_ID join Groups on Contact_Groups.Group_ID = Groups.id ORDER BY Contacts.id', function(err, rows) {
    cb(err, rows);
  })
}

function joinConjuctionGroups(cb) {
  db.all('select Groups.id, Contacts.name, Contacts.telp_number, Contacts.email, Contact_Groups.Group_ID, Groups.name_of_group from Groups join Contact_Groups on Contact_Groups.Group_ID = Groups.id join Contacts on Contacts.id = Contact_Groups.Contact_ID order by Contact_Groups.Group_ID', function(err, rows) {
    cb(err, rows);
  })
}

function getGroupsPerID(id, cb) {
  db.all('select name_of_group from Groups join Contact_Groups on Contact_Groups.Group_ID = Groups.id where Contact_Groups.Contact_ID ="' + id + '"', function(err, rows){
    cb(err,rows);
  });
}

function getGroupsByID(id, cb){
  db.all('select * from Groups where id="'+id+'"', function(err, rows){
    cb(err, rows);
  })
}

function getAllContact(cb) {
  db.all('select * from Contacts', function(err, rows) {
    cb(err, rows);
  });
}

function getContactById(id, cb) {
  db.all(`select * from Contacts where id='${id}'`, function(err, rows) {
    cb(err, rows);
  })
}

function insertContact(data, cb) {
  db.run(`insert into contacts values(null,'${data.name}','${data.company}','${data.telp_number}','${data.email}')`, function(err) {
    cb(err, this.lastID);
  });
}
function insertContactGroup(data, cb) {
  db.run(`insert into Contact_Groups values(null, '${data.Contact_ID}', '${data.Group_ID}')`, function(err) {
    cb(err);
  })
}

function editContact(data, cb) {
  var sqlQ = "update Contacts set ";
  sqlQ += "name = '" + data.name + "', "
  sqlQ += "company = '" + data.company + "', "
  sqlQ += "telp_number = '" + data.telp_number + "', "
  sqlQ += "email = '" + data.email + "' "
  sqlQ += "where id='" + data.id + "'";
  db.all(sqlQ, function(err) {
    cb(err);
  });
}

function getAllAdresses(cb) {
  db.all('select Adresses.id, Adresses.street, Adresses.city, Adresses.zipcode, Contacts.name from Adresses left join Contacts on Contacts.id = Contact_ID', function(err, rows) {
    cb(err, rows);
  })
}

function getAdressesById(id, cb) {
  db.all(`select * from Adresses where id='${id}'`, function(err, rows) {
    cb(err, rows);
  })
}

function getContactAdress(id, cb) {
  db.all(`select * from Adresses where Contact_id='${id}'`, function(err, rows) {
    cb(err, rows);
  })
}

function insertAdress(data, cb) {
  db.all('insert into Adresses values(null,"' + data.street + '","' + data.city + '","' + data.zipcode + '","' + data.Contact_ID + '")', function(err) {
    cb(err);
  });
}

function getAllProfile(cb) {
  db.all('select Profile.id, Profile.username, Profile.password, Profile.Contact_ID, Contacts.name from Profile join Contacts on Contacts.id = Contact_ID', function(err, rows) {
    cb(err, rows);
  })
}

function getAllGroups(cb) {
  db.all('select * from Groups', function(err, rows) {
    cb(err, rows);
  });
}

app.get('/', function(req, res) {
  res.render('home');
})

app.get('/contacts', function(req, res) {
  // getAllContact((err, rows) => {
  //   res.render('contacts', {
  //     dataRows: rows,
  //     message: req.query.message,
  //   });
  // })
  joinConjuction(function(err, rows) {
    for (var i = 0; i < rows.length - 1; i++) {
      if (rows[i].id === rows[i + 1].id) {
        rows[i].name_of_group += ", " + rows[i + 1].name_of_group;
        rows.splice(i + 1, 1);
        i--;
      }
    }
    getAllGroups((err2, rows2) => {
      res.render('contacts', {
        dataRows: rows,
        groupRows: rows2,
        message: req.query.message,
      })
    })
  })
})

app.get('/contacts/adresses/:id', function(req, res) {
  getContactById(req.param('id'), (err, rows) => {
    getContactAdress(req.param('id'), (err2, rows2) => {
      res.render('adresses_detail', {
        dataRows: rows,
        adressRows: rows2
      });
    })
  })
})

app.post('/contacts/adresses/:id', function(req, res) {
  var data = {
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode,
    Contact_ID: req.param('id')
  }
  insertAdress(data, function(err) {
    var str = "Success";
    if (err !== null) {
      str = "Failed";
    }
    // res.render('contacts', {dataRows:rows, message:str})
    res.redirect('../../adresses' + '?message=' + str);
  });
})

app.post('/contacts', function(req, res) {
  if (req.body !== null) {
    var data = {
      name: req.body.name,
      company: req.body.company,
      telp_number: req.body.telp_number,
      email: req.body.email
    }
    insertContact(data, function(err, lastID) {
      var str = "Success";
      if (err !== null) {
        str = "Failed";
      }
      var data  = {
        Contact_ID: lastID,
        Group_ID: req.body.group_id
      }
      insertContactGroup(data, function(err){
        res.redirect('contacts?message=' + str);
      })
      // res.render('contacts', {dataRows:rows, message:str})
    });
  }
})

app.get('/contacts/edit/:id', function(req, res) {
  getContactById(req.param('id'), (err, rows) => {
    res.render('contacts_edit', {
      dataRows: rows
    });
  })
})

app.post('/contacts/edit/:id', function(req, res) {
  if (req.body !== null) {
    var data = {
      id: req.param('id'),
      name: req.body.name,
      company: req.body.company,
      telp_number: req.body.telp_number,
      email: req.body.email
    }
    editContact(data, (err) => {
      var str = "Success edit Data";
      if (err !== null) {
        str = "Failed to edit Data";
      }
      getAllContact((err, rows) => {
        res.render('contacts', {
          dataRows: rows,
          message: str
        })
      })
    })
  }
})

app.get('/contacts/delete/:id', function(req, res) {
  db.all(`delete from Contacts where id='${req.param('id')}'`, function(err, rows) {
    res.redirect('../../contacts')
  })
})

app.get('/groups/assign/:id', function(req, res){
  getAllContact(function(err, rows){
    getGroupsByID(req.param('id'), function(err2, rows2){
      res.render('assign-group', {contactsRows: rows, groupsRows: rows2})
    })
  })
})

app.post('/groups/assign/:id', function(req, res){
  var data = {
    Contact_ID:req.body.contact_id,
    Group_ID:req.param('id'),
  }
  insertContactGroup(data, function(err){
    res.redirect('../../groups');
  })
})

app.get('/groups', function(req, res) {
  // getAllGroups((err, rows) => {
  //   res.render('groups', {
  //     dataRows: rows
  //   });
  // })
  joinConjuctionGroups(function(err, rows){
    for (var i = 0; i < rows.length - 1; i++) {
      if (rows[i].id === rows[i + 1].id) {
        rows[i].name += ", " + rows[i + 1].name;
        rows.splice(i + 1, 1);
        i--;
      }
    }
    res.render('groups', {
      dataRows: rows
    })
  })
})

app.post('/groups', function(req, res) {
  if (req.body !== null) {
    var sqlQ = "insert into groups values(null,'" + req.body.name_of_group + "')";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('groups')
    });
  }
})

app.get('/groups/edit/:id', function(req, res) {
  db.all(`select * from Groups where id='${req.param('id')}'`, function(err, rows) {
    console.log(rows);
    res.render('groups_edit', {
      dataRows: rows
    });
  })
})

app.post('/groups/edit/:id', function(req, res) {
  if (req.body !== null) {
    var sqlQ = "update Groups set ";
    console.log(req.body);
    sqlQ += "name_of_group = '" + req.body.name_of_group + "' "
    sqlQ += "where id='" + req.param('id') + "'";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('../../groups')
    });
  }
})

app.get('/groups/delete/:id', function(req, res) {
  db.all(`delete from Groups where id='${req.param('id')}'`, function(err, rows) {
    res.redirect('../../groups')
  })
})

app.get('/adresses', function(req, res) {
  getAllAdresses((err, rows) => {
    getAllContact((err2, rows2) => {
      res.render('adresses', {
        dataRows: rows,
        contactsRows: rows2
      });
    })
  })
})

app.post('/adresses', function(req, res) {
  if (req.body !== null) {
    var sqlQ = "insert into Adresses values(null,'" + req.body.street + "',' ";
    sqlQ += req.body.city + "', '" + req.body.zipcode + "', " + req.body.contact_id + ")";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('adresses')
    });
  }
})

app.get('/adresses/edit/:id', function(req, res) {
  db.all(`select * from Adresses where id='${req.param('id')}'`, function(err, rows) {
    console.log(rows);
    res.render('adresses_edit', {
      dataRows: rows
    });
  })
})

app.post('/adresses/edit/:id', function(req, res) {
  if (req.body !== null) {
    var sqlQ = "update Adresses set ";
    console.log(req.body);
    sqlQ += "street = '" + req.body.street + "', "
    sqlQ += "city = '" + req.body.city + "', "
    sqlQ += "zipcode = '" + req.body.zipcode + "' "
    sqlQ += "where id='" + req.param('id') + "'";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('../../adresses')
    });
  }
})

app.get('/adresses/delete/:id', function(req, res) {
  db.all(`delete from Adresses where id='${req.param('id')}'`, function(err, rows) {
    res.redirect('../../adresses')
  })
})

app.get('/profiles', function(req, res) {
  getAllAdresses((err, rows) => {
    getAllContact((err2, rows2) => {
      res.render('profiles', {
        dataRows: rows,
        contactsRows: rows2
      });
    })
  })
})

app.post('/profiles', function(req, res) {
  if (req.body !== null) {
    var sqlQ = "insert into Profile values(null,'" + req.body.username + "',' ";
    sqlQ += req.body.password + "', '" + req.body.contact_id + "')";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('profiles')
    });
  }
})

app.get('/profiles/edit/:id', function(req, res) {
  db.all(`select Profile.id, Profile.username, Profile.password, Profile.Contact_ID, Contacts.name from Profile join Contacts ON Contacts.id = contact_id where Profile.id='${req.param('id')}'`, function(err, rows) {
    db.all('select * from Contacts', function(err2, rows2) {
      res.render('profiles_edit', {
        dataRows: rows,
        contactsRows: rows2
      });
    });
  })
})

app.post('/profiles/edit/:id', function(req, res) {
  if (req.body !== null) {
    console.log('send', req.body);
    var sqlQ = "update Profile set ";
    sqlQ += "username = '" + req.body.username + "', "
    sqlQ += "password = '" + req.body.password + "', "
    sqlQ += "Contact_ID = '" + req.body.contact_id + "' "
    sqlQ += "where id='" + req.param('id') + "'";
    console.log(req.param('id'));
    db.all(sqlQ, function(err) {
      res.redirect('../../profiles')
    });
  }
})

app.get('/profiles/delete/:id', function(req, res) {
  db.all(`delete from Profile where id='${req.param('id')}'`, function(err, rows) {
    res.redirect('../../profiles')
  })
})

app.listen(3000);
