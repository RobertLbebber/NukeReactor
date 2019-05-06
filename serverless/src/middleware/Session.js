import Sessions, { Utils } from "../db/models/Sessions.json";
import _ from "lodash";

export const handleSession = async event => {
  let key = null;
  if (!_.isNil(event.headers)) {
    return { message: "No Headers Found in the Event Object", status: false };
  } else if (!_.isNil(event.headers.seesionId)) {
    return { message: "No Session Id Found in the Event Object", status: false };
  } else {
    key = event.headers.seesionId;
  }
  let resultSet = await Sessions.get({ [Sessions.primaryKey]: key });
  if (_.isNil(resultSet)) {
    return { message: "No Session Found with that key", status: false };
  } else if (!Utils.stillActive(resultSet)) {
    return { message: "No Session Found with that key", status: false };
  } else {
    //update the timestamp
    await Sessions.update({ id: key });
    return { status: true };
  }
};

export default { handleSession };
