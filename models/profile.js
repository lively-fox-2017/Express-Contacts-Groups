const sqlite3 = require('sqlite3').verbose();
const db= new sqlite3.Database ('db/database.db')

class Profile {
  constructor() {

  }
  // static postInsertProfile(){
  //   db.run(`INSERT INTO Profiles(username,password,Contactsid) VALUES (
  //     '${req.body.username}',
  //     '${req.body.password}',
  //     '${req.body.Contactsid}')`
  // }
  static deleteProfile(params){
    db.run(`DELETE FROM Profiles WHERE id =${params.id}`)
  }

  // static getEditProfile(){
  //   db.all
  // }
}


module.exports = Profile;
