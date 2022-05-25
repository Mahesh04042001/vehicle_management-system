//import required

const database = require("../connection/db");
const logger = require("../config/logger");

//controller post method for driver

var driverPost = async (object) => {
  try {
    var result = await database
      .insert(object, "driver_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `diver controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `diver controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `diver controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting id's for driver

var driverGetId = async () => {
  try {
    var result = await database
      .get("driver_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `diver controller ,success response from database from get database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `diver controller ,error response from get method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `diver controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting details for driver

var driverGetDetails = async (id) => {
  try {
    var result = await database
      .getAll(id, "driver_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `diver controller ,success response from database from getall database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `diver controller ,error response from getall method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `diver controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller delete method for driver

var driverDeleteDetails = async (id, rev) => {
  try {
    var result = await database
      .deleted(id, rev, "driver_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `diver controller ,success response from database from delete details database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `diver controller ,error response from delete details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `diver controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller update method for driver

var driverUpdateDetails = async (objectValue) => {
  try {
    var result = await database
      .update(objectValue, "driver_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `diver controller ,success response from database from update  database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `diver controller ,error response from update details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `diver controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//export the methods

module.exports = {
  driverPost,
  driverGetId,
  driverGetDetails,
  driverDeleteDetails,
  driverUpdateDetails,
};
