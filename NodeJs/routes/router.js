var router = require("express").Router();
dbconnection = require("../connection/db");

router.post("/postUser", function (request, response) {
  var object = {
    name: request.body.name,
    username: request.body.username,
    password: request.body.pwd,
    mobile: request.body.mobile,
    dob: request.body.dob,
    city: request.body.city,
    state: request.body.state,
  };
  dbconnection.insert(object, "first_sample").then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

module.exports = { router };
