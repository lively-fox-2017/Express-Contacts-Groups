// const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.serialize((err, rows) => {
  db.run('create table if not exists Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, company STRING, telp_number STRING, email STRING)')
    if (err) {
      console.log('Error!')
    }else{
      console.log('Table created!!')
    }

  db.run('create table if not exists Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group STRING)')
    if (err) {
      console.log('Error!')
    }else{
      console.log('Table created!!')
    }

  db.run('create table if not exists Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username STRING, password STRING)')
    if (err) {
      console.log('Error!')
    }else{
      console.log('Table created!!')
      db.run('alter table Profile add id_contact integer references Contacts (id)')
      if (err) {
        console.log('Error!')
      }else{
        console.log('Alter Table berhasil')
      }

      db.run('create unique index unique_name on Profile(id_contact)')
        if (err) {
          console.log('Error!')
        }else{
          console.log('Alter Table berhasil')
        }
    }

  db.run('create table if not exists addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street STRING, city STRING, zipcode INTEGER)')
    if (err) {
      console.log('Error!')
    }else{
      console.log('Table created!!')
      db.run('alter table addresses add id_contact integer references Contacts (id)')
      if (err) {
        console.log('Error!')
      }else{
        console.log('Alter Table berhasil')
      }
    }

    db.run('create table konjungsi (id integer primary key autoincrement, id_contact integer, id_group integer, foreign key(id_contact) references Contacts(id), foreign key(id_group) references Groups(id));', (err, row) =>{
      if(!err){
        console.log('Bikin konjungsi berhasil')
      }else{
        console.log('gagal broh')
      }
    })
})