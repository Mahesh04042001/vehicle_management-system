const Cloudant = require("@cloudant/cloudant");
const val = require("../../config");

var cloudant = Cloudant({
  url: val.CLOUDANT_URL,
  username: val.CLOUDANT_USERNAME,
  password: val.CLOUDANT_PASSWORD,
});

console.log(val.CLOUDANT_USERNAME);

//System User Database method-----------------------------

insertuser = function (objectValue) {
  console.log(objectValue);
  return cloudant.use("first_sample").insert(objectValue);
};

getuser = function () {
  return cloudant.use("first_sample").list();
};
getalluser = function (id) {
  return cloudant.use("first_sample").get(id);
};
deleteuser = function (id, id1) {
  return cloudant.use("first_sample").destroy(id, id1);
};

updateuser = function (doc) {
  // var doc = {
  //   _id: "d23441ca3542f2a42bc74e32131e5c12",
  //   _rev: "2-5accd4d3144c0fb36a11f9723b030ee6",
  //   name: "mah",
  //   username: "jfj",
  //   password: "ij",
  //   mobile: 8248,
  //   dob: "0008-08-08",
  //   city: "uruih",
  //   state: "iuh",
  // };
  console.log(doc);
  return cloudant.use("first_sample").insert(doc);

  // return cloudant.use("first_sample").insert(doc, function (err, data) {
  //   if (data) {
  //     console.log("update the data");
  //     return data;
  //   } else {
  //     console.log("can not update the data");
  //     return err;
  //   }
  // });
};
// getalluser();
// var d = getuser();
// console.log("hello form db" + d);
// var d = deleteuser();
// console.log("delete form db" + d);
// var d = updateuser();
// console.log("update form db" + d);
//------------------------------------------------------------------------

//driver database methods------------------------------------------------
insertdriver = function (objectValue) {
  console.log(objectValue);
  return cloudant.use("driver_details").insert(objectValue);
};

getdriver = function () {
  return cloudant.use("driver_details").list();
};
getalldriver = function (id) {
  return cloudant.use("driver_details").get(id);
};
deletedriver = function (id, id1) {
  return cloudant.use("driver_details").destroy(id, id1);
};

updatedriver = function (doc) {
  console.log(doc);
  return cloudant.use("driver_details").insert(doc);
};
//------------------------------------------------------------------------

//vehicle database methods------------------------------------------------
insertvehicle = function (objectValue) {
  console.log(objectValue);
  return cloudant.use("vehicle_details").insert(objectValue);
};

getvehicle = function () {
  return cloudant.use("vehicle_details").list();
};
getallvehicle = function (id) {
  return cloudant.use("vehicle_details").get(id);
};
deletevehicle = function (id, id1) {
  return cloudant.use("vehicle_details").destroy(id, id1);
};

updatevehicle = function (doc) {
  console.log(doc);
  return cloudant.use("vehicle_details").insert(doc);
};
//------------------------------------------------------------------------

//Fuel database methods------------------------------------------------
insertfuel = function (objectValue) {
  console.log(objectValue);
  return cloudant.use("fuel_details").insert(objectValue);
};

getfuel = function () {
  return cloudant.use("fuel_details").list();
};
getallfuel = function (id) {
  return cloudant.use("fuel_details").get(id);
};
deletefuel = function (id, id1) {
  return cloudant.use("fuel_details").destroy(id, id1);
};

updatefuel = function (doc) {
  console.log(doc);
  return cloudant.use("fuel_details").insert(doc);
};
//------------------------------------------------------------------------

//Insurance database methods------------------------------------------------
insertinsurance = function (objectValue) {
  console.log(objectValue);
  return cloudant.use("insurance_details").insert(objectValue);
};

getinsurance = function () {
  return cloudant.use("insurance_details").list();
};
getallinsurance = function (id) {
  return cloudant.use("insurance_details").get(id);
};
deleteinsurance = function (id, id1) {
  return cloudant.use("insurance_details").destroy(id, id1);
};

updateinsurance = function (doc) {
  console.log(doc);
  return cloudant.use("insurance_details").insert(doc);
};
//------------------------------------------------------------------------

//Maintanence database methods------------------------------------------------
insertmaintanence = function (objectValue) {
  console.log(objectValue);
  return cloudant.use("maintanence_details").insert(objectValue);
};

getmaintanence = function () {
  return cloudant.use("maintanence_details").list();
};
getallmaintanence = function (id) {
  return cloudant.use("maintanence_details").get(id);
};
deletemaintanence = function (id, id1) {
  return cloudant.use("maintanence_details").destroy(id, id1);
};

updatemaintanence = function (doc) {
  console.log(doc);
  return cloudant.use("maintanence_details").insert(doc);
};
//------------------------------------------------------------------------

module.exports = {
  insertuser,
  getuser,
  cloudant,
  getalluser,
  deleteuser,
  updateuser,
  insertdriver,
  getdriver,
  getalldriver,
  deletedriver,
  updatedriver,
  insertvehicle,
  getvehicle,
  getallvehicle,
  deletevehicle,
  updatevehicle,
  insertfuel,
  getfuel,
  getallfuel,
  deletefuel,
  updatefuel,
  insertinsurance,
  getinsurance,
  getallinsurance,
  deleteinsurance,
  updateinsurance,
  insertmaintanence,
  getmaintanence,
  getallmaintanence,
  deletemaintanence,
  updatemaintanence,
};
