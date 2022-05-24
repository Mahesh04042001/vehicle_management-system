const user_database = require("../connection/db");
const logger = require("../config/logger");

var fuelPost = async (object) => {
  try {
    var result = await user_database
      .insert(object, "fuel_details")
      .then((data) => {
        logger.logger.log("info", "response from database");
        return data;
      })
      .catch((err) => {
        logger.logger.error("error", "response from database");
        return err;
      });
  } catch (error) {
    console.log("error occured");
  }
  return result;
};

var fuelGetId = async () => {
  try {
    var result = await user_database
      .get("fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          "response from database from get database method"
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `error response from get method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    console.log("error occured");
  }
  return result;
};

var fuelGetDetails = async (id) => {
  try {
    var result = await user_database
      .getAll(id, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          "response from database from getall database method"
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `error response from getall method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    console.log("error occured");
  }
  return result;
};

var fuelDeleteDetails = async (id, rev) => {
  try {
    var result = await user_database
      .deleted(id, rev, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          "response from database from delete details database method"
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `error response from delete details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    console.log("error occured");
  }
  return result;
};

var fuelUpdateDetails = async (objectValue) => {
  try {
    var result = await user_database
      .update(objectValue, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          "response from database from update details database method"
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `error response from update details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    console.log("error occured");
  }
  return result;
};

module.exports = {
  fuelPost,
  fuelGetId,
  fuelGetDetails,
  fuelDeleteDetails,
  fuelUpdateDetails,
};
