const express = require("express");
const usercontroller = require("./controllers/usercontroller");
const driverContoller = require("./controllers/driverController");
const vehicleController = require("./controllers/vehicleController");
const fuelController = require("./controllers/fuelControllers");
const insuranceController = require("./controllers/insuranceControllers");
const maintanenceController = require("./controllers/maintanenceController");
const bodyparser = require("body-parser");
const app = express();
const logger = require("./config/logger");
const routing = require("./routes/router");
const port = 8000;
const cors = require("cors");
const dbconnection = require("./connection/db");
// const { loggers } = require("winston");
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

//User--------------------------------------------------------
//To post the user data to the database

app.post("/postUser", (request, response) => {
  var object = {
    name: request.body.name,
    username: request.body.username,
    password: request.body.pwd,
    mobile: request.body.mobile,
    dob: request.body.dob,
    city: request.body.city,
    state: request.body.state,
  };
  usercontroller
    .userPost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
  console.log("Data added");
});

//To get all the _id,_rev... form database

app.get("/getUser", (request, response) => {
  console.log("start");
  usercontroller
    .userGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get list of the user's  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users data");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all user data value from database
app.get("/getUser/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  usercontroller
    .userGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
  console.log("end");
});

//To delete particular user from database

app.delete("/deleteUser/:id/:id1", (request, response) => {
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  usercontroller
    .userDeleteDetails(request.params.id, request.params.id1)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully delete details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

// To update the particular user data using id
app.put("/updateUser", (request, response) => {
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
  usercontroller
    .userUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
});

//Driver-----------------------------------------------------------
//To post the driver data to the database
app.post("/postDriver", (request, response) => {
  var object = {
    drivername: request.body.drivername,
    mobile: request.body.mobile,
    licencenumber: request.body.licencenumber,
    licenceenddate: request.body.licenceenddate,
    city: request.body.city,
    state: request.body.state,
  };
  driverContoller
    .driverPost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
  console.log("Data added");
});

//To get all the driver's  _id,_rev... form database
app.get("/getDriver", (request, response) => {
  console.log("start");
  driverContoller
    .driverGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get list of the user's  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users data");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all driver data value from database
app.get("/getDriver/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  driverContoller
    .driverGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
  console.log("end");
});

//To delete particular driver from database

app.delete("/deleteDriver/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  driverContoller
    .driverDeleteDetails(request.params.id, request.params.id1)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully delete details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

// To update the particular driver data using id
app.put("/updateDriver", (request, response) => {
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
  driverContoller
    .driverUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
});

//----------------------------------------------------------------

//Vehicle---------------------------------------------------------
//To post the vehicle data to the database
app.post("/postVehicle", (request, response) => {
  var object = {
    vehiclenumber: request.body.vehiclenumber,
    vehicletype: request.body.vehicletype,
    drivername: request.body.drivername,
    color: request.body.color,
    registerdate: request.body.registerdate,
    chasisno: request.body.chasisno,
    cost: request.body.cost,
  };
  vehicleController
    .vehiclePost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
  console.log("Data added");
});

//To get all the vehicle's  _id,_rev... form database
app.get("/getVehicle", (request, response) => {
  console.log("start");
  vehicleController
    .vehicleGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get list of the user's  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users data");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all vehicle's data value from database
app.get("/getVehicle/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  vehicleController
    .vehicleGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
  console.log("end");
});

//To delete particular vehicle from database

app.delete("/deleteVehicle/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  vehicleController
    .vehicleDeleteDetails(request.params.id, request.params.id1)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully delete details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

// To update the particular vehicle data using id
app.put("/updateVehicle", (request, response) => {
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
  vehicleController
    .vehicleUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
});

//-------------------------

//Fuel---------------------------------------------------------
//To post the fuel data to the database
app.post("/postFuel", (request, response) => {
  var object = {
    quantity: request.body.quantity,
    fillingdate: request.body.fillingdate,
    cost: request.body.cost,
    unique: request.body.unique,
  };
  fuelController
    .fuelPost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
  console.log("Data added");
});

//To get all the fuel's  _id,_rev... form database
app.get("/getFuel", (request, response) => {
  console.log("start");
  fuelController
    .fuelGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get list of the user's  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users data");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all fuel's data value from database
app.get("/getFuel/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  fuelController
    .fuelGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });

  console.log("end");
});

//To delete particular fuel from database

app.delete("/deleteFuel/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  fuelController
    .fuelDeleteDetails(request.params.id, request.params.id1)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully delete details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

// To update the particular fuel data using id
app.put("/updateFuel", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    quantity: request.body.quantity,
    fillingdate: request.body.fillingdate,
    cost: request.body.cost,
    unique: request.body.unique,
  };
  fuelController
    .fuelUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
});

//----------------------------------------------------------

//Insurance---------------------------------------------------------
//To post the insurance data to the database
app.post("/postInsurance", (request, response) => {
  // console.log("hello");
  var object = {
    // vehiclenumber: request.body.vehiclenumber,
    // vehicletype: request.body.vehicletype,
    company: request.body.company,
    startdate: request.body.startdate,
    enddate: request.body.enddate,
    cost: request.body.cost,
    unique: request.body.unique,
  };
  insuranceController
    .insurancePost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
  console.log("Data added");
});

//To get all the insurance's  _id,_rev... form database
app.get("/getInsurance", (request, response) => {
  console.log("start");
  insuranceController
    .insuranceGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get list of the user's  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users data");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all insurance's data value from database
app.get("/getInsurance/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  insuranceController
    .insuranceGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });

  console.log("end");
});

//To delete particular insurance from database

app.delete("/deleteInsurance/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  insuranceController
    .insuranceDeleteDetails(request.params.id, request.params.id1)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully delete details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

// To update the particular insurance data using id
app.put("/updateInsurance", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    // vehiclenumber: request.body.vehiclenumber,
    // vehicletype: request.body.vehicletype,
    company: request.body.company,
    startdate: request.body.startdate,
    enddate: request.body.enddate,
    cost: request.body.cost,
    unique: request.body.unique,
  };
  insuranceController
    .insuranceUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
});

//----------------------------------------------------------

//Maintanence---------------------------------------------------------
//To post the maintanence data to the database
app.post("/postMaintanence", (request, response) => {
  // console.log("hello");
  var object = {
    // vehiclenumber: request.body.vehiclenumber,
    // vehicletype: request.body.vehicletype,
    date: request.body.date,
    cost: request.body.cost,
    description: request.body.description,
    unique: request.body.unique,
  };
  maintanenceController
    .maintanencePost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
  console.log("Data added");
});

//To get all the maintanence's  _id,_rev... form database
app.get("/getMaintanence", (request, response) => {
  console.log("start");
  maintanenceController
    .maintanenceGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get list of the user's  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users data");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all maintanence's data value from database
app.get("/getMaintanence/:id", (request, response) => {
  console.log("getting id from database" + request.params.id);
  maintanenceController
    .maintanenceGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully get details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });

  console.log("end");
});

//To delete particular maintanence from database

app.delete("/deleteMaintanence/:id/:id1", (request, response) => {
  console.log("hi");
  console.log(
    "getting id from id and id2:" + request.params.id + request.params.id1
  );
  console.log("deleting start");
  dbconnection;
  maintanenceController
    .maintanenceDeleteDetails(request.params.id, request.params.id1)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `successfully delete details of the user's from  _id ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

// To update the particular maintanence data using id
app.put("/updateMaintanence", (request, response) => {
  console.log("hey");
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    // vehiclenumber: request.body.vehiclenumber,
    // vehicletype: request.body.vehicletype,
    date: request.body.date,
    cost: request.body.cost,
    description: request.body.cost,
    unique: request.body.unique,
  };
  maintanenceController
    .maintanenceUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log("info", `response send to the angular ${res}`);
    })
    .catch((err) => {
      response.send("something went wrong while sending response from node");
      logger.logger.log(
        "info",
        "something went wrong while sending response from node"
      );
    });
});

//----------------------------------------------------------

app.listen(port, (err) => {
  if (err) {
    logger.logger.error("error", `something bad happened ${err}`);
  }
  logger.logger.log("info", `server is listening on http://localhost:${port}`);
});
