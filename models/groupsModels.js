var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');

class Groups {
	constructor(id, name_of_group, name){
		this.id = id
		this.name_of_group = name_of_group
		this.name = name
	}

	static getAllGroup(cbselect){
		let resultGroups = []
		let objGroups = {}

		db.all('select g.id, g.name_of_group, c.name from Groups g left join konjungsi on g.id = konjungsi.id_group left join Contacts c on konjungsi.id_contact = c.id;', function (err, groups) {
        if(!err){
        	groups.forEach((grup) =>{
        		objGroups = new Groups(grup.id, grup.name_of_group, grup.name)
        		resultGroups.push(objGroups)
        	})
        cbselect(err, resultGroups)
        }
  	  })
	}

	static insertGroup(name, cbinsert){
		db.run('insert into Groups (name_of_group) values (?);', name, err => {
  			cbinsert(err)
  		})
	}

	static deleteGroup(id, cbdelete){
		db.run('delete from Groups where id = (?)', id, err =>{
			cbdelete(err)
		})
	}

	static getGroup(id, cbget){

		db.all('select * from Groups where id = (?);', id, (err, groups) => {
  			cbget(err, groups)
  		}) 
	}

	static updateGroup(name_of_group, id, cbupdate){
		db.run('update Groups set name_of_group = (?) where id = (?);', name_of_group, id, err =>{
			cbupdate(err)
		})
	}
}

module.exports = Groups