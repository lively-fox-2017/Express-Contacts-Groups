var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, company TEXT, telp_number TEXT, email TEXT)");
db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)");
db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
db.run("CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)");

function alterContactsProfiles() {
  let query = "ALTER TABLE Profile ADD COLUMN ContactsId INTEGER REFERENCES Contacts('id')";
  db.run(query,(err)=>{
    console.log('Tabel berhasil di tambah');
  })
  // db.run("ALTER TABLE Profile DROP nama")
}
// db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)");

function editContactsId() {
  // ALTER TABLE table_name
  // MODIFY COLUMN column_name datatype;
  let query = "create unique index unique_name on Profile(ContactsId);";
  db.run(query,(err)=>{
    console.log('Kolom di Profile berhasil di Edit');
  })
  // db.run("ALTER TABLE Profile DROP nama")
}
function alterContactsAddress() {
  let query = "ALTER TABLE Addresses ADD COLUMN ContactsId INTEGER REFERENCES Contacts('id')";
  db.run(query,(err)=>{
    console.log('Kolom di Addrees berhasil di tambah');
  })
  // db.run("ALTER TABLE Profile DROP nama")
}

// alterContactsProfiles();
// editContactsId();
// alterContactsAddress();