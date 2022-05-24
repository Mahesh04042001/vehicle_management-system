const user_database = require("../connection/db");
const logger = require("../config/logger");

var maintanencePost = async (object) => {
  try {
    var result = await user_database
      .insert(object, "maintanence_details")
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

var maintanenceGetId = async () => {
  try {
    var result = await user_database
      .get("maintanence_details")
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

var maintanenceGetDetails = async (id) => {
  try {
    var result = await user_database
      .getAll(id, "maintanence_details")
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

var maintanenceDeleteDetails = async (id, rev) => {
  try {
    var result = await user_database
      .deleted(id, rev, "maintanence_details")
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

var maintanenceUpdateDetails = async (objectValue) => {
  try {
    var result = await user_database
      .update(objectValue, "maintanence_details")
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
  maintanencePost,
  maintanenceGetId,
  maintanenceGetDetails,
  maintanenceDeleteDetails,
  maintanenceUpdateDetails,
};