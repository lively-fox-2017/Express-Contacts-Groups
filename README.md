# express-sqlite3-crud

# EXPRESS CONTACTS-GROUPS
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
menampilkan list Contact, Group, Addresses dan Profiles menambah data Contact, Group, Addresses dan Profiles ,
melakukan edit data dan delete data berdasarkan data yang dipilih

## Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: 
  - attribute id ber-type integer
  - attribute name ber-type string
  - attribute company ber-type string
  - attribute telp_number ber-type string
  - attribute email ber-type string
* Groups: 
  - attribute id ber-type integer
  - attribute name_of_group ber-type string
* Profile: 
  - attribute id ber-type integer
  - attribute username ber-type string
  - attribute password ber-type string
* Addresses: 
  - attribute id ber-type integer
  - attribute street ber-type string
  - attribute city ber-type string 
  - attribute zipcode ber-type integer

## Release 1 - Basic Routing for Contacts dan Groups
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs<br />

|METHOD | ROUTE                   | KETERANGAN                                          |
|-------|:------------------------|:-----------------------------------------------------
|GET    | /contacts               | Menampilkan semua data contacts                     |
|POST   | /contacts               | Menerima input contact                              |
|GET    | /contacts/edit/:id      | Menampilkan data contact spesifik untuk diubah      |
|POST   | /contacts/edit/:id      | Menerima data form untuk update contact             |
|GET    | /contacts/delete/:id    | Menghapus data contact berdasarkan id               |
|GET    | /groups                 | Menampilkan semua data groups                       |
|POST   | /groups                 | Menerima data form untuk input group                |
|GET    | /groups/edit/:id        | Menampilkan data group spesifik untuk diubah        |
|POST   | /groups/edit/:id        | Menerima data form untuk update group               |
|GET    | /groups/delete/:id      | Menghapus data group berdasarkan id                 |


<br />

## Release 2 - Basic Routing for Addresses dan Profiles
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs<br />

|METHOD | ROUTE                   | KETERANGAN                                          |
|-------|:------------------------|:-----------------------------------------------------
|GET    | /addresses              | Menampilkan semua data addresses                    |
|POST   | /addresses              | Menerima data form untuk input address              |
|GET    | /addresses/edit/:id     | Menampilkan data address spesifik untuk diubah      |
|POST   | /addresses/edit/:id     | Menerima data form untuk update address             |
|GET    | /addresses/delete/:id   | Menghapus data address berdasarkan id               |
|GET    | /profiles               | Menampilkan semua data profiles                     |
|POST   | /profiles               | Menerima data form untuk input profile              |
|GET    | /profiles/edit/:id      | Menampilkan data profile spesifik untuk diubah      |
|POST   | /profiles/edit/:id      | Menerima data form untuk update profile             |
|GET    | /profiles/delete/:id    | Menghapus data profile berdasarkan id               |

