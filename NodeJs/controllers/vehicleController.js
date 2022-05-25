//import required

const database = require("../connection/db");
const logger = require("../config/logger");

//controller post method for vehicle

var vehiclePost = async (object) => {
  try {
    var result = await database
      .insert(object, "vehicle_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `vehicle controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `vehicle controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `vehicle controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting id's for vehicle

var vehicleGetId = async () => {
  try {
    var result = await database
      .get("vehicle_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `vehicle controller ,success response from database from get database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `vehicle controller ,error response from get method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `vehicle controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting details for vehicle

var vehicleGetDetails = async (id) => {
  try {
    var result = await database
      .getAll(id, "vehicle_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `vehicle controller ,success response from database from getall database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `vehicle controller ,error response from getall method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `vehicle controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller delete method for vehicle

var vehicleDeleteDetails = async (id, rev) => {
  try {
    var result = await database
      .deleted(id, rev, "vehicle_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `vehicle controller ,success response from database from delete details database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `vehicle controller ,error response from delete details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `vehicle controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller update method for vehicle

var vehicleUpdateDetails = async (objectValue) => {
  try {
    var result = await database
      .update(objectValue, "vehicle_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `vehicle controller ,success response from database from update  database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `vehicle controller ,error response from update details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `vehicle controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//export the methods

module.exports = {
  vehiclePost,
  vehicleGetId,
  vehicleGetDetails,
  vehicleDeleteDetails,
  vehicleUpdateDetails,
};
