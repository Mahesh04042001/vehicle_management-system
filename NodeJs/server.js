const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 8000;
const cors = require("cors");
const dbconnection = require("./connection/db");
app.use(express.static("public"));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

//User--------------------------------------------------------
//To post the user data to the database
app.post("/postuser", (request, response) => {
  // console.log("hello");
  var object = {
    name: request.body.name,
    username: request.body.username,
    password: request.body.pwd,
    mobile: request.body.mobile,
    dob: request.body.dob,
    city: request.body.city,
    state: request.body.state,
  };
  dbconnection.insertuser(object).then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
  console.log("Data added");
});

//To get all the _id,_rev... form database
app.get("/getuser", (request, response) => {
  console.log("start");
  // var store = dbconnection.getuser();
  dbconnection.getuser().then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

//To get the all user data value from database
app.get("/getuser/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  dbconnection.getalluser(request.params.id).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  console.log("end");
});

//To delete particular user from database

app.delete("/deleteuser/:id/:id1", (request, response) => {
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection.deleteuser(request.params.id, request.params.id1).then((res) => {
    if (res) {
      console.log("deleted success");
      response.send(res);
    } else {
      console.log("can not deleted...");
      response.send("error");
    }
  });
});

// To update the particular user data using id
app.put("/updateuser", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    name: request.body.name,
    username: request.body.username,
    password: request.body.pwd,
    mobile: request.body.mobile,
    dob: request.body.dob,
    city: request.body.city,
    state: request.body.state,
  };
  // console.log(object);
  dbconnection.updateuser(object).then((res) => {
    if (res) {
      console.log("updated....");
      response.send(res);
    } else {
      console.log("can not updated....");
      response.send("error");
    }
  });
});

//Driver-----------------------------------------------------------
//To post the driver data to the database
app.post("/postdriver", (request, response) => {
  // console.log("hello");
  var object = {
    drivername: request.body.drivername,
    mobile: request.body.mobile,
    licencenumber: request.body.licencenumber,
    licenceenddate: request.body.licenceenddate,
    city: request.body.city,
    state: request.body.state,
  };
  dbconnection.insertdriver(object).then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
  console.log("Data added");
});

//To get all the driver's  _id,_rev... form database
app.get("/getdriver", (request, response) => {
  console.log("start");
  dbconnection.getdriver().then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

//To get the all driver data value from database
app.get("/getdriver/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  dbconnection.getalldriver(request.params.id).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  console.log("end");
});

//To delete particular driver from database

app.delete("/deletedriver/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection
    .deletedriver(request.params.id, request.params.id1)
    .then((res) => {
      if (res) {
        console.log("deleted success");
        response.send(res);
      } else {
        console.log("can not deleted...");
        response.send("error");
      }
    });
});

// To update the particular driver data using id
app.put("/updatedriver", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    drivername: request.body.drivername,
    mobile: request.body.mobile,
    licencenumber: request.body.licencenumber,
    licenceenddate: request.body.licenceenddate,
    city: request.body.city,
    state: request.body.state,
  };
  dbconnection.updatedriver(object).then((res) => {
    if (res) {
      console.log("updated....");
      response.send(res);
    } else {
      console.log("can not updated....");
      response.send("error");
    }
  });
});

//----------------------------------------------------------------

//Vehicle---------------------------------------------------------
//To post the vehicle data to the database
app.post("/postvehicle", (request, response) => {
  // console.log("hello");
  var object = {
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    drivername: request.body.drivername,
    color: request.body.color,
    registerdate: request.body.registerdate,
    chasisno: request.body.chasisno,
    cost: request.body.cost,
  };
  dbconnection.insertvehicle(object).then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
  console.log("Data added");
});

//To get all the vehicle's  _id,_rev... form database
app.get("/getvehicle", (request, response) => {
  console.log("start");
  dbconnection.getvehicle().then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

//To get the all vehicle's data value from database
app.get("/getvehicle/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  dbconnection.getallvehicle(request.params.id).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  console.log("end");
});

//To delete particular vehicle from database

app.delete("/deletevehicle/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection
    .deletevehicle(request.params.id, request.params.id1)
    .then((res) => {
      if (res) {
        console.log("deleted success");
        response.send(res);
      } else {
        console.log("can not deleted...");
        response.send("error");
      }
    });
});

// To update the particular vehicle data using id
app.put("/updatevehicle", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    drivername: request.body.drivername,
    color: request.body.color,
    registerdate: request.body.registerdate,
    chasisno: request.body.chasisno,
    cost: request.body.cost,
  };
  dbconnection.updatevehicle(object).then((res) => {
    if (res) {
      console.log("updated....");
      response.send(res);
    } else {
      console.log("can not updated....");
      response.send("error");
    }
  });
});

//-------------------------

//Fuel---------------------------------------------------------
//To post the fuel data to the database
app.post("/postfuel", (request, response) => {
  // console.log("hello");
  var object = {
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    quantity: request.body.quantity,
    fillingdate: request.body.fillingdate,
    cost: request.body.cost,
  };
  dbconnection.insertfuel(object).then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
  console.log("Data added");
});

//To get all the fuel's  _id,_rev... form database
app.get("/getfuel", (request, response) => {
  console.log("start");
  dbconnection.getfuel().then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

//To get the all fuel's data value from database
app.get("/getfuel/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  dbconnection.getallfuel(request.params.id).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  console.log("end");
});

//To delete particular fuel from database

app.delete("/deletefuel/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection.deletefuel(request.params.id, request.params.id1).then((res) => {
    if (res) {
      console.log("deleted success");
      response.send(res);
    } else {
      console.log("can not deleted...");
      response.send("error");
    }
  });
});

// To update the particular fuel data using id
app.put("/updatefuel", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    quantity: request.body.quantity,
    fillingdate: request.body.fillingdate,
    cost: request.body.cost,
  };
  dbconnection.updatefuel(object).then((res) => {
    if (res) {
      console.log("updated....");
      response.send(res);
    } else {
      console.log("can not updated....");
      response.send("error");
    }
  });
});

//----------------------------------------------------------

//Insurance---------------------------------------------------------
//To post the insurance data to the database
app.post("/postinsurance", (request, response) => {
  // console.log("hello");
  var object = {
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    company: request.body.company,
    startdate: request.body.startdate,
    enddate: request.body.enddate,
    cost: request.body.cost,
  };
  dbconnection.insertinsurance(object).then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
  console.log("Data added");
});

//To get all the insurance's  _id,_rev... form database
app.get("/getinsurance", (request, response) => {
  console.log("start");
  dbconnection.getinsurance().then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

//To get the all insurance's data value from database
app.get("/getinsurance/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  dbconnection.getallinsurance(request.params.id).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  console.log("end");
});

//To delete particular insurance from database

app.delete("/deleteinsurance/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection
    .deleteinsurance(request.params.id, request.params.id1)
    .then((res) => {
      if (res) {
        console.log("deleted success");
        response.send(res);
      } else {
        console.log("can not deleted...");
        response.send("error");
      }
    });
});

// To update the particular insurance data using id
app.put("/updateinsurance", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    company: request.body.company,
    startdate: request.body.startdate,
    enddate: request.body.enddate,
    cost: request.body.cost,
  };
  dbconnection.updateinsurance(object).then((res) => {
    if (res) {
      console.log("updated....");
      response.send(res);
    } else {
      console.log("can not updated....");
      response.send("error");
    }
  });
});

//----------------------------------------------------------

//Maintanence---------------------------------------------------------
//To post the maintanence data to the database
app.post("/postmaintanence", (request, response) => {
  // console.log("hello");
  var object = {
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    date: request.body.date,
    cost: request.body.cost,
  };
  dbconnection.insertmaintanence(object).then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
  console.log("Data added");
});

//To get all the maintanence's  _id,_rev... form database
app.get("/getmaintanence", (request, response) => {
  console.log("start");
  dbconnection.getmaintanence().then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

//To get the all maintanence's data value from database
app.get("/getmaintanence/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  dbconnection.getallmaintanence(request.params.id).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  console.log("end");
});

//To delete particular maintanence from database

app.delete("/deletemaintanence/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection
    .deletemaintanence(request.params.id, request.params.id1)
    .then((res) => {
      if (res) {
        console.log("deleted success");
        response.send(res);
      } else {
        console.log("can not deleted...");
        response.send("error");
      }
    });
});

// To update the particular maintanence data using id
app.put("/updatemaintanence", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    date: request.body.date,
    cost: request.body.cost,
  };
  dbconnection.updatemaintanence(object).then((res) => {
    if (res) {
      console.log("updated....");
      response.send(res);
    } else {
      console.log("can not updated....");
      response.send("error");
    }
  });
});

//----------------------------------------------------------

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on http://localhost:${port}`);
});
