import generateErrorUtils from "./helpers.js";

const validateSchemaUtil = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    throw generateErrorUtils(400, "BAD_DATA", error.message);
  }
};

export default validateSchemaUtil;
