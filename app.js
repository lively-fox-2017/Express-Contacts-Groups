const express = require('express')
const app = express()
var path = require('path');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

//buat index

app.get('/', (req, res) => {

    db.all('select c.id, c.name, c.company, c.telp_number, c.email, g.name_of_group from Contacts c left join konjungsi on c.id = konjungsi.id_contact left join Groups g on g.id = konjungsi.id_group;', (err, contacts) => {  
      if(!err){
        db.all('select * from Groups;', (err, groups) => {
          if(!err){
            res.render('pages/index', {temp : contacts, temp1 : groups})
          }
        })
      }
    })
})

//buat group
app.get('/group', (req, res) => {
	
  		db.all('select g.id, g.name_of_group, c.name from Groups g left join konjungsi on g.id = konjungsi.id_group left join Contacts c on konjungsi.id_contact = c.id;', function (err, groups) {
        if(!err){
          res.render('pages/group', {temp : groups})
        }
  	  })
});


//buat profile
app.get('/profile', (req, res) => {

    db.all('select Profile.id, Profile.username, Profile.password, Contacts.name from Profile left join Contacts on Profile.id_contact = Contacts.id;', (err, profiles) => {
      if(!err){
        db.each('select id, name rom Contacts;', (err, contacts) => {
          if(!err){
            res.render('pages/profile', {temp : profiles, temp1 : contacts, message : ''})
          }
        })
      }
    })
})


//buat address

app.get('/address', (req,res) => {

    db.all('select addresses.id, addresses.street, addresses.city, addresses.zipcode, Contacts.name from addresses left join Contacts on addresses.id_contact = Contacts.id;', (err, addresses) => {
      if(!err){
        db.all('select * from Contacts', (err, contacts) => {
          if(!err){
            res.render('pages/address', {temp : addresses, temp1 : contacts})
          }
        })
      }
    })
})

//buat address detail

app.get('/addressDetail/:id', (req, res) => {

    db.all('select addresses.id, addresses.street, addresses.city, addresses.zipcode, Contacts.name from addresses left join Contacts on addresses.id_contact = Contacts.id where Contacts.id = (?);', (req.params.id), (err, address) => {
      if(!err){
        db.all('select id, name from Contacts where id = (?);', (req.params.id), (err, contact) => {
          if(!err){
            res.render('pages/address', {temp : temp, temp1 : temp1})
          }
        })
      }
    })
})

app.listen(5000, () => {
	console.log('Mulai gan')
})

//Tambah kontak
app.post('/newcontact', (req, res) => {
  		db.run('insert into Contacts (name, company, telp_number, email) values (?, ?, ?, ?);',(req.body.name), (req.body.company), (req.body.telp), (req.body.email), (err) =>{
        if(!err){
          db.get('select id from Contacts order by id desc limit 1;', (err, contact) => {
            console.log(contact.id)
            console.log(req.body.name_of_group)
            db.run('insert into konjungsi (id_contact, id_group) values (?, ?);',(contact.id), (req.body.name_of_group))
            res.redirect('/')
          })
        }
      })
})

//Tambah grup
app.post('/newgroup', (req, res) => {
   db.serialize( () => {
  		db.run('insert into Groups (name_of_group) values (?);',(req.body.name))
  		res.redirect('/group')
	})
})

//Tambah profil
app.post('/newprofile', (req, res) => {
   db.serialize((err, rows) => {
  		db.run('insert into Profile (username, password, id_contact) values (?, ?, ?);',(req.body.username), (req.body.password), (req.body.id_contact), (err, row) => {
        if(!err){
        res.redirect('/profile')
      }else{
        let temp = []
        let temp1 = []
  
      db.serialize( () => {
          db.each('select Profile.id, Profile.username, Profile.password, Contacts.name from Profile left join Contacts on Profile.id_contact = Contacts.id;', function (err, row) {
            if(!err){
              temp.push({id : row.id, username : row.username, password : row.password, name : row.name})
              db.each('select id, name from Contacts;', function (err, row1) {
                if(!err){
                  temp1.push({id : row1.id, name : row1.name})
                }
              },() => {
              console.log(temp1)
              res.render('pages/profile', {temp : temp, temp1 : temp1, message : 'Data sudah ada'})
            })
          }
        })    
      })
    }
  })    
	})
})

//Tambah address
app.post('/newaddress', (req, res) => {
   db.serialize(function () {
  		db.run('insert into addresses (street, city, zipcode, id_contact) values (?, ?, ?, ?);',(req.body.street), (req.body.city), (req.body.zipcode), (req.body.id_contact))
  		res.redirect('/address')
	})
   
})

//buat delete contact
app.get('/deleteContact/:id', (req, res) => {
	db.serialize(function () {
  		db.run('delete from Contacts where id = (?);',(req.params.id)) 
  		res.redirect('/')
	})
});

//buat delete grup
app.get('/deleteGroup/:id', (req, res) => {
	db.serialize(function () {
  		db.run('delete from Groups where id = (?);',(req.params.id)) 
  		res.redirect('/group')
	})
});


//buat delete profile
app.get('/deleteProfile/:id', (req, res) => {
	db.serialize(function () {
  		db.run('delete from Profile where id = (?);',(req.params.id)) 
  		res.redirect('/profile')
	})
});


//buat delete address
app.get('/deleteAddresses/:id', (req, res) => {
	db.serialize(function () {
  		db.run('delete from addresses where id = (?);',(req.params.id)) 
  		res.redirect('/address')
	})
});

//buat edit contact
app.get('/editContact/:id', (req, res) => {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Contacts where id = (?);',(req.params.id), (err, row) => {
  			temp.push({id : row.id, name : row.name, company : row.company, telp : row.telp_number, email : row.email})
  	},() => {
  		res.render('pages/editContact', {temp : temp})
  		})		
  	}) 
});


app.post('/editContactFinal', (req, res) => {
   db.serialize(function () {
  		db.run('update Contacts set name = (?), company = (?), telp_number = (?), email = (?) where id = (?);',(req.body.name), (req.body.company), (req.body.telp), (req.body.email), (req.body.id))
  		res.redirect('/')
	})
   
})

//buat edit group
app.get('/editGroup/:id', (req, res) => {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Groups where id = (?);',(req.params.id), (err, row) => {
  			temp.push({id : row.id, name_of_group : row.name_of_group})
  	},() => {
  		res.render('pages/editGroup', {temp : temp})
  		})		
  	}) 
});


app.post('/editGroupFinal', (req, res) => {
   db.serialize(function () {
  		db.run('update Groups set name_of_group = (?) where id = (?);',(req.body.name), (req.body.id))
  		res.redirect('/group')
	})
   
})

//buat edit profile
app.get('/editProfile/:id', function(req, res) {
  let temp = []
  db.serialize(function () {
      db.each('select * from Profile where id = (?);',(req.params.id), (err, row) => {
        temp.push({id : row.id, username : row.username, password : row.password})
    },() => {
      res.render('pages/editProfile', {temp : temp})
      })    
    }) 
});


app.post('/editProfileFinal', (req, res) => {
   db.serialize(function () {
      db.run('update Profile set username = (?), password = (?) where id = (?);',(req.body.username), (req.body.password), (req.body.id))
      res.redirect('/profile')
  })
})

//buat edit addresses
app.get('/editAddresses/:id', function(req, res) {
  
  let temp = []
  
  db.serialize(function () {
      db.each('select * from addresses where id = (?);',(req.params.id), (err, row) => {
        temp.push({id : row.id, street : row.street, city : row.city, zipcode : row.zipcode})
    },() => {
      res.render('pages/editAddresses', {temp : temp})
      })    
  }) 
});


app.post('/editAddressFinal', (req, res) => {
   
   db.serialize(function () {
      db.run('update addresses set street = (?), city = (?), zipcode = (?) where id = (?);',(req.body.street), (req.body.city), (req.body.zipcode), (req.body.id))
      res.redirect('/address')
  }) 
})