//import required

const database = require("../connection/db");
const logger = require("../config/logger");

//controller post method for maintanence

var maintanencePost = async (object) => {
  try {
    var result = await database
      .insert(object, "maintanence_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `maintanence controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `maintanence controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `maintanence controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting id's for maintanence

var maintanenceGetId = async () => {
  try {
    var result = await database
      .get("maintanence_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `maintanence controller ,success response from database from get database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `maintanence controller ,error response from get method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `maintanence controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting details for maintanence

var maintanenceGetDetails = async (id) => {
  try {
    var result = await database
      .getAll(id, "maintanence_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `maintanence controller ,success response from database from getall database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `maintanence controller ,error response from getall method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `maintanence controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller delete method for maintanence

var maintanenceDeleteDetails = async (id, rev) => {
  try {
    var result = await database
      .deleted(id, rev, "maintanence_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `maintanence controller ,success response from database from delete details database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `maintanence controller ,error response from delete details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `maintanence controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller update method for maintanence

var maintanenceUpdateDetails = async (objectValue) => {
  try {
    var result = await database
      .update(objectValue, "maintanence_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `maintanence controller ,success response from database from update  database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `maintanence controller ,error response from update details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `maintanence controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//export the methods

module.exports = {
  maintanencePost,
  maintanenceGetId,
  maintanenceGetDetails,
  maintanenceDeleteDetails,
  maintanenceUpdateDetails,
};
