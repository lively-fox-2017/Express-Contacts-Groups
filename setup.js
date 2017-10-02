var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('contacts-groups.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id))");
  db.run("CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT)");

});

db.close();
