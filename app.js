var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/contacts', (req, res) => {
  db.all('SELECT * from contacts order by name',(err,data)=>{
    db.all('SELECT * FROM groups ORDER BY name',(err,dataGroups)=>{
      if (!err) {
        // res.send(dataGroups)
        res.render('contacts',{data:data,dataGroups:dataGroups})
      } else {
        res.send(err)
      }
    })
  });
})

app.post('/contacts', (req, res) => {
  db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES ('${req.body.name}','${req.body.company}',
        '${req.body.telp_number}','${req.body.email}')`,function(err,result){
    if (!err) {
      // let lastID=db.lastInsertRowId;
      // console.warn("inserted id:", this);
      // res.send(this);
      db.run(`INSERT INTO ContactsGroups (contactId,groupId) VALUES (${this.lastID},${req.body.groupId})`,(err)=>{
        if (!err) {
          res.redirect('/contacts');
        } else {
          res.send(err)
        }
      });
    } else {
      res.send(err)
    }
  });
})
app.get('/contacts/delete/:id', (req, res) => {
  db.run(`DELETE FROM contacts WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  });
})
app.get('/contacts/edit/:id', (req, res) => {
  db.each(`SELECT * FROM contacts WHERE id=${req.params.id}`,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('contacts_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE contacts SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}' WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  });
})

app.get('/contacts/:id/addresses', (req, res) => {
  db.each(`SELECT * from contacts WHERE id=${req.params.id}`,(err,data)=>{
    db.all(`SELECT * from addresses WHERE contactId=${req.params.id} ORDER BY street`,(err,dataAddresses)=>{
      if (!err) {
        // res.send(data)
        res.render('contact_addresses',{data:data,dataAddresses:dataAddresses})
      } else {
        res.send(err)
      }
    });
  })
})

app.post('/contacts/:id/addresses', (req, res) => {
  db.run(`INSERT INTO addresses (street,city,zipcode,contactId) VALUES ('${req.body.street}','${req.body.city}',${req.body.zipcode},${req.params.id})`,(err)=>{
    if (!err) {
      res.redirect(`/contacts/${req.params.id}/addresses`);
    } else {
      res.send(err)
    }
  });
})

//groups
app.get('/groups', (req, res) => {
  db.all('SELECT * FROM groups ORDER BY name',(err,data)=>{
    db.all(`SELECT a.id,a.groupId as groupId,b.name as name_of_contact,c.name FROM ContactsGroups a, groups b, contacts c WHERE a.groupId=b.id AND  a.contactId=c.id ORDER BY b.name`,(err,dataMembers)=>{
      if (!err) {
        let newData=data.map(rows=>{
          rows["members"]=[];
          for (var i = 0; i < dataMembers.length; i++) {
            // console.log(rows.id,'==',dataMembers[i].groupId);
            if (rows.id==dataMembers[i].groupId) {
              rows.members.push(dataMembers[i].name)
            }
          }
          return rows
        })
        res.render('groups',{data:newData})
      } else {
        res.send(err)
      }
    })
  });
})
app.post('/groups', (req, res) => {
  db.run(`INSERT INTO groups (name) VALUES ('${req.body.name}')`,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})
app.get('/groups/delete/:id', (req, res) => {
  db.run(`DELETE FROM groups WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})
app.get('/groups/edit/:id', (req, res) => {
  db.each(`SELECT * FROM groups WHERE id=${req.params.id}`,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('groups_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
app.post('/groups/edit/:id', (req, res) => {
  db.run(`UPDATE groups SET name='${req.body.name}' WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})

app.get('/groups/edit/:id', (req, res) => {
  db.each(`SELECT b.*,a.* FROM groups b left join ContactsGroups a on b.gro= WHERE id=${req.params.id}`,(err,data)=>{
    db.all(`SELECT * FROM ContactsGroups WHERE groupsId=${req.params.id}`)
    if (!err) {
      // res.send(data)
      res.render('groups_edit',{data:data,dataMembers:dataMembers});
    } else {
      res.send(err)
    }
  });
})

app.get('/groups/:id/assign_contacts', (req, res) => {
  db.each(`SELECT * from groups WHERE id=${req.params.id}`,(err,data)=>{
    db.all('SELECT * from contacts',(err,dataContacts)=>{
      if (!err) {
        // console.log(data);
        res.render('assign_contacts',{data:data,dataContacts:dataContacts})
        // res.send(data);
      } else {
        res.send(err)
      }
    })
  });
})

app.post('/groups/:id/assign_contacts', (req, res) => {
  db.run(`INSERT INTO ContactsGroups (contactId,groupId) VALUES (${req.body.contactId},${req.params.id})`,(err)=>{
    if (!err) {
      res.redirect(`/groups`);
    } else {
      res.send(err)
    }
  });
})

app.get('/groups/:id/unassign_contacts', (req, res) => {
  db.each(`SELECT * FROM groups WHERE id=${req.params.id}`,(err,data)=>{
    db.all(`SELECT a.id as ContactGroupId,a.contactId as contactId,b.name as name_of_contact,c.name,c.company,c.email FROM ContactsGroups a, groups b, contacts c WHERE a.groupId=b.id AND  a.contactId=c.id AND a.groupId=${req.params.id} ORDER BY b.name`,(err,dataMembers)=>{
      if (!err) {
        // console.log(data);
        res.render('unassign_contacts',{data:data,dataMembers:dataMembers})
        // res.send(data);
      } else {
        res.send(err)
      }
    })
  });
})

app.get('/groups/:id/unassign_contact/:ContactGroupId', (req, res) => {
  db.run(`DELETE FROM ContactsGroups WHERE id=${req.params.ContactGroupId}`,function(err,result){
    if (!err) {
      res.redirect(`/groups/${req.params.id}/unassign_contacts`);
    } else {
      res.send(err)
    }
  });
})

//addresses
app.get('/addresses', (req, res) => {
  db.all('SELECT b.name,b.company,a.* from addresses a left join contacts b on a.contactId=b.id order by name',(err,data)=>{
    db.all('SELECT * from contacts',(err,dataContacts)=>{
      if (!err) {
        // res.send(data)
        res.render('addresses',{data:data,dataContacts:dataContacts})
      } else {
        res.send(err)
      }
    })
  });
})

app.post('/addresses', (req, res) => {
  db.run(`INSERT INTO addresses (street,city,zipcode,contactId) VALUES ('${req.body.street}','${req.body.city}',${req.body.zipcode},${req.body.contactId})`,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})
app.get('/addresses/delete/:id', (req, res) => {
  db.run(`DELETE FROM addresses WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})
app.get('/addresses/edit/:id', (req, res) => {
  db.each(`SELECT * FROM addresses WHERE id=${req.params.id}`,(err,data)=>{
    db.all('SELECT * FROM contacts',(err,dataContacts)=>{
      if (!err) {
        // res.send(data)
        res.render('addresses_edit',{data:data,dataContacts:dataContacts});
      } else {
        res.send(err)
      }
    })
  });
})
app.post('/addresses/edit/:id', (req, res) => {
  db.run(`UPDATE addresses SET street='${req.body.street}',city='${req.body.city}',zipcode=${req.body.zipcode}, contactId=${req.body.contactId} WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})

//profiles
app.get('/profiles', (req, res) => {
  db.all('SELECT b.name,b.company,a.* FROM profiles a left join contacts b on a.contactId=b.id order by name',(err,data)=>{
    db.all('SELECT * FROM contacts',(err,dataContacts)=>{
      if (!err) {
        // res.send(data)
        res.render('profiles',{data:data,dataContacts:dataContacts,sendError:''})
        // res.send(dataContacts);
      } else {
        res.send(err)
      }
    })
  });
})

app.post('/profiles', (req, res) => {
  db.all(`SELECT * FROM PROFILES WHERE contactId=${req.body.contactId}`,(err,data)=>{
    if (data.length==0) {
      db.run(`INSERT INTO profiles (username,password,contactId) VALUES ('${req.body.username}','${req.body.password}',${req.body.contactId})`,(err)=>{
        if (!err) {
          res.redirect('/profiles');
        } else {
          res.send(err)
        }
      });
    } else {
      db.all('SELECT b.name,b.company,a.* FROM profiles a left join contacts b on a.contactId=b.id order by contactId,name',(err,data)=>{
        db.all('SELECT * FROM contacts',(err,dataContacts)=>{
          if (!err) {
            // res.send(data)
            res.render('profiles',{data:data,dataContacts:dataContacts,sendError:'Contact Id sudah dipakai! Silahkan ganti Contact Id yang lain'})
            // res.send(dataContacts);
          } else {
            res.send(err)
          }
        })
      });
    }
  })
})
app.get('/profiles/delete/:id', (req, res) => {
  db.run(`DELETE FROM profiles WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/profiles');
    } else {
      res.send(err)
    }
  });
})
app.get('/profiles/edit/:id', (req, res) => {
  db.each(`SELECT * FROM profiles WHERE id=${req.params.id}`,(err,data)=>{
    db.all('SELECT * FROM contacts',(err,dataContacts)=>{
      if (!err) {
        // res.send(data)
        res.render('profiles_edit',{data:data,dataContacts:dataContacts,sendError:''});
      } else {
        res.send(err)
      }
    })
  });
})
app.post('/profiles/edit/:id', (req, res) => {
  db.all(`SELECT * FROM PROFILES WHERE contactId NOT IN (SELECT contactId FROM PROFILES WHERE id=${req.params.id}) AND  contactId=${req.body.contactId}`,(err,data)=>{
    // console.log(data.length);
    if (data.length==0) {
      db.run(`UPDATE profiles SET username='${req.body.username}',password='${req.body.password}',contactId='${req.body.contactId}' WHERE id=${req.params.id}`,(err)=>{
        if (!err) {
          res.redirect('/profiles');
        } else {
          res.send(err)
        }
      });
    } else {
      db.each(`SELECT * FROM profiles WHERE id=${req.params.id}`,(err,data)=>{
        db.all('SELECT * FROM contacts',(err,dataContacts)=>{
          if (!err) {
            // res.send(data)
            res.render('profiles_edit',{data:data,dataContacts:dataContacts,sendError:'Contact Id sudah dipakai! Silahkan ganti Contact Id yang lain'});
          } else {
            res.send(err)
          }
        })
      });
    }
  })
})
app.listen(3000,()=>{
  console.log('app listen on port 3000');
})
