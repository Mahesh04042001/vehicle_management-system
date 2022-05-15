const cloudant = require("@cloudant/cloudant");
var Adduser = {
  name: { type: String },
  username: { type: String },
  mobile: { type: Number },
  dob: { type: String },
  city: { type: String },
  state: { type: String },
};
module.export = { Adduser: Adduser };
