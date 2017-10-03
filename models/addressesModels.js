var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');

class Addresses {

	constructor(id, street, city, zipcode, name){

		this.id = id
		this.street = street
		this.city = city
		this.zipcode = zipcode
		this.name = name
	}

	static getAllAddresses(cbselect){

		let resultaddresses = []
		let objaddresses = {}

		db.all('select addresses.id, addresses.street, addresses.city, addresses.zipcode, Contacts.name from addresses left join Contacts on addresses.id_contact = Contacts.id;', (err, addresses) => {
      	if(!err){
      		addresses.forEach((alamat) =>{
      			objaddresses = new Addresses(alamat.id, alamat.street, alamat.city, alamat.zipcode, alamat.name)
      			console.log(objaddresses)
      			resultaddresses.push(objaddresses)
      		})
      		
        	db.all('select * from Contacts', (err, contacts) => {
          		if(!err){
            		cbselect(resultaddresses, contacts, err)
          		}
        	})
      	}
    })
	}

	static getAddressesDetail(id, cbdetail){

		db.all('select addresses.id, addresses.street, addresses.city, addresses.zipcode, Contacts.name from addresses left join Contacts on addresses.id_contact = Contacts.id where addresses.Contact_id = (?);', id, (err, address) => {
      		if(!err){
        		db.all('select id, name from Contacts where id = (?);', id, (err, contact) => {
          			if(!err){
          				
            			cbdetail(address, contact, err)
          			}
        		})
      		}
    	})
	}
}

module.exports = Addresses