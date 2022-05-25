//import required

const database = require("../connection/db");
const logger = require("../config/logger");

//controller post method for insurance

var insurancePost = async (object) => {
  try {
    var result = await database
      .insert(object, "insurance_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `insurance controller ,success response from insert database ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `insurance controller ,error response from insert database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `insurance controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting id's for insurance

var insuranceGetId = async () => {
  try {
    var result = await database
      .get("insurance_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `insurance controller ,success response from database from get database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `insurance controller ,error response from get method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `insurance controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller get method for getting details for insurance

var insuranceGetDetails = async (id) => {
  try {
    var result = await database
      .getAll(id, "insurance_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `insurance controller ,success response from database from getall database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `insurance controller ,error response from getall method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `insurance controller ,error occured in catch block ${error}`
    );
  }
  return result;
};

//controller delete method for insurance

var insuranceDeleteDetails = async (id, rev) => {
  try {
    var result = await database
      .deleted(id, rev, "insurance_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `insurance controller ,success response from database from delete details database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `insurance controller ,error response from delete details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `insurance controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//controller update method for insurance

var insuranceUpdateDetails = async (objectValue) => {
  try {
    var result = await database
      .update(objectValue, "insurance_details")
      .then((data) => {
        logger.logger.log(
          "info",
          `insurance controller ,success response from database from update  database method ${data}`
        );
        return data;
      })
      .catch((err) => {
        logger.logger.error(
          "error",
          `insurance controller ,error response from update details method of database ${err}`
        );
        return err;
      });
  } catch (error) {
    logger.logger.error(
      "error",
      `insurance controller ,error  occured in catch block ${error}`
    );
  }
  return result;
};

//export the methods

module.exports = {
  insurancePost,
  insuranceGetId,
  insuranceGetDetails,
  insuranceDeleteDetails,
  insuranceUpdateDetails,
};
