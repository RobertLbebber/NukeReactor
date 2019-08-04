import Sessions, { Utils } from "../db/models/Sessions.json";
import _ from "lodash";
import { StatusObject } from "../io/ResponseStatus.js";

export const handleSession = async event => {
  let key = null;
  if (_.isNil(event.headers)) {
    return StatusObject(false, "No Headers found in the Event Object");
  } else if (_.isNil(event.headers.seesionId)) {
    return StatusObject(false, "No Session Id found in the Event Object");
  } else {
    key = event.headers.seesionId;
  }
  let resultSet = await Sessions.get({ [Sessions.primaryKey]: key });
  if (_.isNil(resultSet)) {
    return StatusObject(false, "No Session found with that key");
  } else if (!Utils.stillActive(resultSet)) {
    return StatusObject(false, "No Session found with that key", 2);
  } else {
    //update the timestamp
    await Sessions.update({ id: key });
    return StatusObject(true);
  }
};

export default { handleSession };
