//import required

const Cloudant = require("@cloudant/cloudant");
const val = require("../config/config");

// configure cloudant database using URL,USERNAME,PASSWORD

var cloudant = Cloudant({
  url: val.CLOUDANT_URL,
  username: val.CLOUDANT_USERNAME,
  password: val.CLOUDANT_PASSWORD,
});

//insert function

var insert = function (objectValue, dbname) {
  return new Promise((resolve, reject) => {
    if (objectValue == undefined) {
      return reject(objectValue);
    } else {
      var dbresult = cloudant.use(dbname).insert(objectValue);
      return resolve(dbresult);
    }
  });
};

//get all id using this function from database

var get = function (database_name) {
  return new Promise((resolve, reject) => {
    if (database_name == undefined) {
      return reject(database_name);
    } else {
      var dbresult = cloudant.use(database_name).list();
      return resolve(dbresult);
    }
  });
};

//get all details about the particular id

var getAll = function (id, database_name) {
  return new Promise((resolve, reject) => {
    if (id == undefined) {
      return reject(id);
    } else {
      var dbresult = cloudant.use(database_name).get(id);
      return resolve(dbresult);
    }
  });
};

//delete function using id and rev
var deleted = function (_id, _rev, database_name) {
  return new Promise((resolve, reject) => {
    if (_id == undefined || _rev == undefined) {
      return reject(id);
    } else {
      var dbresult = cloudant.use(database_name).destroy(_id, _rev);
      return resolve(dbresult);
    }
  });
};

//update the existing details

var update = function (objectValue, dbname) {
  console.log(objectValue);
  return new Promise((resolve, reject) => {
    if (objectValue == undefined) {
      return reject(objectValue);
    } else {
      var dbresult = cloudant.use(dbname).insert(objectValue);
      return resolve(dbresult);
    }
  });
};

//export the funtions

module.exports = {
  insert,
  get,
  getAll,
  deleted,
  update,
};
