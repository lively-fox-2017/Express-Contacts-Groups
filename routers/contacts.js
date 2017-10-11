const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Group = require('../models/group.js');
const Contact_Groups = require('../models/contact_groups.js')
const Adresses = require('../models/adress.js');

router.get('/', function(req, res) {
  // -----------=====================--------------------====================-------------------==============\\
  /*
   *   Using promise
   */
  function findGroupId(contact) {
    var obj_promise = new Promise((resolve, reject) => {
      contact['group'] = "";
      Contact_Groups.findBy(contact.id, 'Contact_ID').then((rows2) => {
        var group_id = rows2.map((row) => {
          return row.Group_ID
        });
        var arr_prom = [];
        group_id.forEach((group, index2) => {
          arr_prom.push(Group.findById(group))
        })
        Promise.all(arr_prom).then((results) => {
          results.forEach((result) => {
            if (result !== undefined) {
              contact['group'] += result.name_of_group + ", ";
            }
          })
          resolve(contact);
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    })
    return obj_promise
  }
  Contact.findAll().then((rows) => {
    var arrTemp = [Group.findAll()];
    rows.forEach((contact, index) => {
      arrTemp.push(findGroupId(contact));
    })
    Promise.all(arrTemp).then((results) => {
      groupRows = results[0];
      results.shift();
      res.render('contacts', {
        dataRows: results,
        message: ""+req.query.message,
        groupRows: groupRows
      })
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err);
  })
})
// -----------=====================--------------------====================-------------------==============\\
/*
 *   Using callback
 */
// function jalan(cb) {
//   Contact.findAll(function(err, contactRows) {
//     contactRows.forEach((contact, index) => {
//       contact['group'] = "";
//       Contact_Groups.findBy(contact.id, 'Contact_ID', function(err, rows) {
//         var group_id = rows.map((row) => {
//           return row.Group_ID
//         });
//         group_id.forEach((group, index2) => {
//           Group.findById(group, function(err, rows2) {
//             if (rows2 !== undefined)
//               contact['group'] += rows2.name_of_group + ", ";
//             if (index == contactRows.length - 1 && index2 == group_id.length - 1) {
//               Group.findAll(function(err, rows3) {
//                 cb(contactRows, rows3);
//               })
//             }
//           })
//         });
//       });
//     });
//   });
// }
// jalan(function (contactRows, rows3){
//   res.render('contacts', {
//     dataRows: contactRows,
//     groupRows: rows3,
//     message:""+req.query.message
//   })
// })
// })

router.post('/', function(req, res) {
  var dataContact = {
    name: req.body.name,
    company: req.body.company,
    telp_number: req.body.telp_number,
    email: req.body.email
  }
  Contact.insertData(dataContact).then((lastID) => {
    var data = {
      Contact_ID: lastID,
      Group_ID: req.body.group_id
    }
    Contact_Groups.insertData(data).then(() => {
      res.redirect('contacts?message=success');
    }).catch((err) => {
      res.redirect('contacts?message=' + err);
    })
  }).catch((err) => {
    res.redirect('contacts?message=' + err);
  })
})

router.get('/edit/:id', function(req, res) {
  Contact.findById(req.param('id')).then((rows) => {
    res.render('contacts_edit', {
      dataRows: rows
    });
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res) {
  req.body.id = req.param('id');
  Contact.editData(req.body).then(() => {
    res.redirect('../../contacts?message=null');
  }).catch((err) => {
    res.redirect('../../contacts?message=' + err);
  })
})

router.get('/delete/:id', function(req, res) {
  Contact.deleteData(req.param('id')).then(() => {
    res.redirect('../?message=null');
  }).catch((err) => {
    res.redirect('../?message=' + err);
  })
})

router.get('/adresses/:id', function(req, res) {
  Contact.findById(req.param('id')).then((rows) => {
    Adresses.findBy(req.param('id'), 'Contact_ID').then((rows2) => {
      res.render('adresses_detail', {
        dataRows: rows,
        adressRows: rows2,
        message: ""+req.query.message
      });
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/adresses/:id', function(req, res) {
  req.body.contact_id = req.param('id');
  Adresses.insertData(req.body).then(() => {
    res.redirect('/contacts/adresses/' + req.param('id') + '?message=null');
  }).catch((err) => {
    res.redirect('/contacts/adresses/' + req.param('id') + '?message=' + err);
  })
})

module.exports = router;
