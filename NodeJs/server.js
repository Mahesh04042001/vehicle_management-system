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
const port = 8000;
const cors = require("cors");
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

//User--------------------------------------------------------
//To post the user data to the database form node

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
      logger.logger.log(
        "info",
        `post_user response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post the user's details from node ");
      logger.logger.error(
        "error",
        `can not post the user's details from node ${err}`
      );
    });
});

//To get all the _id,_rev... form database

app.get("/getUser", (request, response) => {
  usercontroller
    .userGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_user list response of the user's  _id & _rev send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of users");
      logger.logger.error("error", `can not get _id of users data ${err}`);
    });
});

//To get the all user data value from database
app.get("/getUser/:id", (request, response) => {
  usercontroller
    .userGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_user details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of users data");
      logger.logger.error("error", `can not get details of users data ${err}`);
    });
});

//To delete particular user from database

app.delete("/deleteUser/:id/:rev", (request, response) => {
  usercontroller
    .userDeleteDetails(request.params.id, request.params.rev)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `delete_user details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of users data");
      logger.logger.error(
        "error",
        `can not delete details of users data ${err}`
      );
    });
});

// To update the particular user data using id
app.put("/updateUser", (request, response) => {
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
      logger.logger.log(
        "info",
        `update_user response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of users data ");
      logger.logger.error(
        "error",
        `can not delete details of users data ${err}`
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
      logger.logger.log(
        "info",
        `post_driver response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post details of drivers data ");
      logger.logger.error(
        "error",
        `can not post details of drivers data ${err}`
      );
    });
});

//To get all the driver's  _id,_rev... form database

app.get("/getDriver", (request, response) => {
  driverContoller
    .driverGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_driver list of the user's  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of driver data");
      logger.logger.error("error", `can not get _id of drivers data ${err}`);
    });
});

//To get the all driver data value from database
app.get("/getDriver/:id", (request, response) => {
  driverContoller
    .driverGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_driver details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of driver data");
      logger.logger.error("error", `can not get details of driver data ${err}`);
    });
});

//To delete particular driver from database

app.delete("/deleteDriver/:id/:rev", (request, response) => {
  driverContoller
    .driverDeleteDetails(request.params.id, request.params.rev)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `delete_driver details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of driver data");
      logger.logger.error(
        "error",
        `can not delete details of diver data ${err}`
      );
    });
});

// To update the particular driver data using id
app.put("/updateDriver", (request, response) => {
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
      logger.logger.log(
        "info",
        `update_driver response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not update details of driver data");
      logger.logger.error(
        "error",
        `can not update details of driver data ${err}`
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
      logger.logger.log(
        "info",
        `post_vehicle response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post details of the vehicle");
      logger.logger.error(
        "error",
        `can not post details of the vehicle ${err}`
      );
    });
});

//To get all the vehicle's  _id,_rev... form database
app.get("/getVehicle", (request, response) => {
  vehicleController
    .vehicleGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_vehicle list of the user's  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of vehicel data");
      logger.logger.error("error", `can not get _id of vehicle data ${err}`);
    });
});

//To get the all vehicle's data value from database
app.get("/getVehicle/:id", (request, response) => {
  vehicleController
    .vehicleGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_vehicle details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of vehicel data");
      logger.logger.error(
        "error",
        `can not get details of vehicel data ${err}`
      );
    });
});

//To delete particular vehicle from database

app.delete("/deleteVehicle/:id/:rev", (request, response) => {
  vehicleController
    .vehicleDeleteDetails(request.params.id, request.params.rev)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `delete_vehicle details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of vehicle data");
      logger.logger.error(
        "error",
        `can not delete details of vehicle data ${err}`
      );
    });
});

// To update the particular vehicle data using id
app.put("/updateVehicle", (request, response) => {
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
      logger.logger.log(
        "info",
        `update_vehicle response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post details of the vehicle ");
      logger.logger.error(
        "error",
        `can not update details of the vehicle ${err}`
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
      logger.logger.log(
        "info",
        `post_fuel response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post details of the fuel");
      logger.logger.error("error", `can not post details of the fuel ${err}`);
    });
});

//To get all the fuel's  _id,_rev... form database
app.get("/getFuel", (request, response) => {
  fuelController
    .fuelGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_fuel list of the user's  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of fuel data");
      logger.logger.error("error", `can not get _id of fuel data ${err}`);
    });
});

//To get the all fuel's data value from database
app.get("/getFuel/:id", (request, response) => {
  fuelController
    .fuelGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_fuel details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of fuel data");
      logger.logger.error("error", `can not get details of fuel data ${err}`);
    });
});

//To delete particular fuel from database

app.delete("/deleteFuel/:id/:rev", (request, response) => {
  fuelController
    .fuelDeleteDetails(request.params.id, request.params.rev)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `delete_fuel details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of fuel data");
      logger.logger.error(
        "error",
        `can not delete details of fuel data ${err}`
      );
    });
});

// To update the particular fuel data using id
app.put("/updateFuel", (request, response) => {
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
      logger.logger.log(
        "info",
        `update_fuel response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not update details of the fuel");
      logger.logger.error("error", `can not post details of the fuel ${err}`);
    });
});

//----------------------------------------------------------

//Insurance---------------------------------------------------------
//To post the insurance data to the database
app.post("/postInsurance", (request, response) => {
  var object = {
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
      logger.logger.log(
        "info",
        `post_insurance response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post details of the insurance");
      logger.logger.error(
        "error",
        `can not post details of the insurance ${err}`
      );
    });
});

//To get all the insurance's  _id,_rev... form database
app.get("/getInsurance", (request, response) => {
  insuranceController
    .insuranceGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_insurance list of the user's  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of insurance data");
      logger.logger.error("error", `can not get _id of insurance data ${err}`);
    });
});

//To get the all insurance's data value from database
app.get("/getInsurance/:id", (request, response) => {
  insuranceController
    .insuranceGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_insurance details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of insurance data");
      logger.logger.error(
        "error",
        `can not get details of insurance data ${err}`
      );
    });
});

//To delete particular insurance from database

app.delete("/deleteInsurance/:id/:rev", (request, response) => {
  insuranceController
    .insuranceDeleteDetails(request.params.id, request.params.rev)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `delete_insurance details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of insurance data");
      logger.logger.error(
        "error",
        `can not delete details of insurance data ${err}`
      );
    });
});

// To update the particular insurance data using id
app.put("/updateInsurance", (request, response) => {
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
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
      logger.logger.log(
        "info",
        `update_insurance response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not update details of the insurance");
      logger.logger.log(
        "info",
        `can not update details of the insurance ${err}`
      );
    });
});

//----------------------------------------------------------

//Maintanence---------------------------------------------------------
//To post the maintanence data to the database
app.post("/postMaintanence", (request, response) => {
  var object = {
    date: request.body.date,
    cost: request.body.cost,
    description: request.body.description,
    unique: request.body.unique,
  };
  maintanenceController
    .maintanencePost(object)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `post_maintanence response send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not post details of the maintanence");
      logger.logger.error("error", "can not post details of the maintanence");
    });
});

//To get all the maintanence's  _id,_rev... form database
app.get("/getMaintanence", (request, response) => {
  maintanenceController
    .maintanenceGetId()
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_maintanence list of the user's  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get _id of maintanence data");
      logger.logger.error(
        "error",
        `can not get _id of maintanence data ${err}`
      );
    });
});

//To get the all maintanence's data value from database
app.get("/getMaintanence/:id", (request, response) => {
  maintanenceController
    .maintanenceGetDetails(request.params.id)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `get_maintanence details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not get details of maintanence data");
      logger.logger.error(
        "error",
        `can not get details of maintanence data ${err}`
      );
    });
});

//To delete particular maintanence from database

app.delete("/deleteMaintanence/:id/:rev", (request, response) => {
  maintanenceController
    .maintanenceDeleteDetails(request.params.id, request.params.rev)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `delete_maintanence details of the user's from  _id send to the angular ${res}`
      );
    })
    .catch((err) => {
      response.send("can not delete details of maintanence data");
      logger.logger.error(
        "error",
        `can not delete details of maintanence data from node ${err}`
      );
    });
});

// To update the particular maintanence data using id

app.put("/updateMaintanence", (request, response) => {
  var object = {
    _id: request.body._id,
    _rev: request.body._rev,
    date: request.body.date,
    cost: request.body.cost,
    description: request.body.description,
    unique: request.body.unique,
  };
  maintanenceController
    .maintanenceUpdateDetails(object)
    .then((res) => {
      response.send(res);
      logger.logger.log(
        "info",
        `update_maintanence response send to the angular from node ${res}`
      );
    })
    .catch((err) => {
      response.send("can not update details of the maintanence");
      logger.logger.log(
        "error",
        `can not update details of the maintanence ${err}`
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
