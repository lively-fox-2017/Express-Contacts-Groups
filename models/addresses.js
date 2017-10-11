const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/database.db')

class Address {
  constructor() {

  }

// static getDataAddress(callback) {
//   db.all(`SELECT * FROM Addresses`, (err,rows) => {
//     if (!err) {
//       callback(rows)
//       } else {
//         console.log(err);
//       }
//     })
//   }

static getDataAddress(callback) {
  db.all(`SELECT Addresses.*, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.id_contacts = Contacts.id `, (errAddress,rowAddress) => {
    db.all(`SELECT * FROM Contacts`, (errContacts,rowContacts) => {
      if (!errContacts) {
        callback(rowAddress,rowContacts)
      } else {
        console.log(errAddress);
      }
    })
  })
}

static addDataAddress(param,callback) {
  db.run(`INSERT INTO Addresses (street,city,zipcode,id_contacts)
  VALUES ('${param.street}','${param.city}','${param.zipcode}', '${param.id_contacts}')`, (err) => {
    if (!err) {
      callback()
    } else {
      console.log(err);
    }
  })
}

static deleteDataAddress(param,callback) {
  db.run(`DELETE FROM Addresses WHERE id = ${param}`, (err,rows) => {
    if (!err) {
      callback(rows)
    } else {
      console.log(err);
    }
  })
}

static findDataById(param, callback) {
  db.all(`SELECT Addresses.* FROM Addresses WHERE id = ${param}`, (errAddress,rowAddress) => {
    db.all(`SELECT * FROM Contacts`, (errContacts,rowContacts) => {
      if (!errContacts) {
        callback(rowAddress,rowContacts)
      } else {
        console.log(errContacts);
      }
    })
  })
}

static editDataAddress(body,param, callback) {
  db.run(`UPDATE Addresses SET
    street = '${body.street}',
    city = '${body.city}',
    zipcode = '${body.zipcode}',
    id_contacts = '${body.id_contacts}' WHERE id = '${param}'`, (err) => {
      if (!err) {
        callback()
      } else {
        console.log(err);
      }
    })
}

}

module.exports = Address
