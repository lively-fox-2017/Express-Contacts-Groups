var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');

class Contacts{
	
	constructor(id, name, company, telp_number, email, name_of_group){
		this.id = id
		this.name = name
		this.company = company
		this.telp_number = telp_number
		this.email = email
		this.name_of_group = name_of_group
	}	

	static getAllContact(cbselect){

		let resultContacts = []
		let objContacts = {}
		let objGroups = {}

		db.all('select c.id, c.name, c.company, c.telp_number, c.email, g.name_of_group from Contacts c left join konjungsi on c.id = konjungsi.id_contact left join Groups g on g.id = konjungsi.id_group;', (err, contacts) => {  
      		if(!err){
      			contacts.forEach((kontak) => {
      				objContacts = new Contacts(kontak.id, kontak.name, kontak.company, kontak.telp_number, kontak.email, kontak.name_of_group)
      				resultContacts.push(objContacts)
      			})
        		db.all('select * from Groups;', (err, groups) => {
          			if(!err){
          				cbselect(resultContacts, groups, err)
            			//res.render('pages/index', {temp : contacts, temp1 : groups})
          			}
        		})
      		}
    	})
	}

	static insertContact(name, company, telp, email, name_of_group, cbinsert){

		db.run('insert into Contacts (name, company, telp_number, email) values (?, ?, ?, ?);', name, company, telp, email, (err) =>{
        if(!err){
          db.get('select id from Contacts order by id desc limit 1;', (err, contact) => {
            db.run('insert into konjungsi (id_contact, id_group) values (?, ?);', contact.id, name_of_group, err =>{
            	cbinsert(err);
            })
          })
        }
      })
	}

	static deleteContact(id_contact, cbdelete){
		db.run('delete from Contacts where id = (?);', id_contact, err =>{
			cbdelete(err)
		})
	}

	static getContact(id_contact, cbselects){
		db.all('select * from Contacts where id = (?)', id_contact, (err, contact) =>{
			cbselects(err, contact)
		})
	}

	static updateContact(name, company, telp_number, email, id, cbupdate){
		db.run('update Contacts set name = (?), company = (?), telp_number = (?), email = (?) where id = (?);', name, company, telp_number, email, id, (err, contact) =>{
			cbupdate(err, contact)
		})
	}
}

module.exports = Contacts