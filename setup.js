var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')

db.serialize(function(){
  //USER PROFILE ONE to ONE
  //======================CONTACT========================
  db.run("CREATE TABLE Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255),company VARCHAR(255),telp_number VARCHAR(255),email VARCHAR(255))",()=>{
    console.log('Table Contacts berhasil dibuat!');
  })
  //====================PROFILE===========================
  db.run("CREATE TABLE Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(255),password VARCHAR(255)) ",()=>{
    console.log('Table Profiles berhasil dibuat!')
  })
  db.run("CREATE TABLE Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,name_of_group VARCHAR(255))",()=>{
    console.log('Table Groups berhasil dibuat!')
  })
  db.run("CREATE TABLE Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,street VARCHAR(255),city VARCHAR(255),zipcode INTEGER(25))",()=>{
    console.log('Table Addresses berhasil dibuat!')
  })

})
// function queryProfile(){
//   let query=`ALTER TABLE Profiles ADD COLUMN Contactsid INTEGER REFERENCES Contacts(id)`
//   db.run(query, (err)=>{
//     console.log('Alter bERHASIL');
//   })
// }
// queryProfile()
// SELECT Profiles.* , Contacts.name FROM Profiles LEFT
// JOIN Contacts ON
// Profiles.Contactsid = Contacts.id ORDER BY Profiles.id

function queryAddressContact(){
  let query=`ALTER TABLE Addresses ADD COLUMN idContacts INTEGER REFERENCES Contacts(id)`
  db.run(query,(err)=>{
    console.log('Alter Address Contact Berhasil');
  })
}
 queryAddressContact()
function uniqueProfile(){
  let  query=`CREATE UNIQUE INDEX Contactsid ON Profiles(Contactsid)`
  db.run(query,()=>{
    // console.log("Alter Unique Berhasil;");
  })
}
uniqueProfile()
