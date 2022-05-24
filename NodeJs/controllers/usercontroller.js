const user_database = require("../connection/db");
const logger = require("../config/logger");

var userPost = async (object) => {
  try {
    var result = await user_database
      .insert(object, "first_sample")
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

var userGetId = async () => {
  try {
    var result = await user_database
      .get("first_sample")
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

var userGetDetails = async (id) => {
  try {
    var result = await user_database
      .getAll(id, "first_sample")
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

var userDeleteDetails = async (id, rev) => {
  try {
    var result = await user_database
      .deleted(id, rev, "first_sample")
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

var userUpdateDetails = async (objectValue) => {
  try {
    var result = await user_database
      .update(objectValue, "first_sample")
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
  userPost,
  userGetId,
  userGetDetails,
  userDeleteDetails,
  userUpdateDetails,
};
