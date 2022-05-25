//import required

const database = require("../connection/db");
const logger = require("../config/logger");

//controller post method for user_admin

var userPost = async (object) => {
  try {
    var result = await database
      .insert(object, "first_sample")
      .then((data) => {
        logger.logger.log(
          "info",
          `user_admin controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `user_admin controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `user_admin controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting id's for user_admin

var userGetId = async () => {
  try {
    var result = await database
      .get("first_sample")
      .then((data) => {
        logger.logger.log(
          "info",
          `user_admin controller ,success response from database from get database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `user_admin controller ,error response from get method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `user_admin controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting details for user_admin

var userGetDetails = async (id) => {
  try {
    var result = await database
      .getAll(id, "first_sample")
      .then((data) => {
        logger.logger.log(
          "info",
          `user_admin controller ,success response from database from getall database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `user_admin controller ,error response from getall method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `user_admin controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller delete method for user_admin

var userDeleteDetails = async (id, rev) => {
  try {
    var result = await database
      .deleted(id, rev, "first_sample")
      .then((data) => {
        logger.logger.log(
          "info",
          `user_admin controller ,success response from database from delete details database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `user_admin controller ,error response from delete details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `user_admin controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller update method for user_admin

var userUpdateDetails = async (objectValue) => {
  try {
    var result = await database
      .update(objectValue, "first_sample")
      .then((data) => {
        logger.logger.log(
          "info",
          `user_admin controller ,success response from database from update  database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `user_admin controller ,error response from update details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `user_admin controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//export the methods

module.exports = {
  userPost,
  userGetId,
  userGetDetails,
  userDeleteDetails,
  userUpdateDetails,
};
