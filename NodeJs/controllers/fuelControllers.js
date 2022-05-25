//import required

const database = require("../connection/db");
const logger = require("../config/logger");

//controller post method for fuel

var fuelPost = async (object) => {
  try {
    var result = await database
      .insert(object, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `fuel controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `fuel controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `fuel controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting id's for fuel

var fuelGetId = async () => {
  try {
    var result = await database
      .get("fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `fuel controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `fuel controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `fuel controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting details for fuel

var fuelGetDetails = async (id) => {
  try {
    var result = await database
      .getAll(id, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `fuel controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `fuel controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `fuel controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller delete method for fuel

var fuelDeleteDetails = async (id, rev) => {
  try {
    var result = await database
      .deleted(id, rev, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `fuel controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `fuel controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `fuel controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller update method for fuel

var fuelUpdateDetails = async (objectValue) => {
  try {
    var result = await database
      .update(objectValue, "fuel_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `fuel controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `fuel controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `fuel controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//export the methods

module.exports = {
  fuelPost,
  fuelGetId,
  fuelGetDetails,
  fuelDeleteDetails,
  fuelUpdateDetails,
};
