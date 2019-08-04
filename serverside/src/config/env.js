import { DEVELOPMENT, DYNAMODB, SERVICE_NAME, DELETION_POLICY } from "./constants";

import server from "./server.json.js";
import provider from "./provider.json.js";

export default {
  mode: DEVELOPMENT,
  mainDB: DYNAMODB,
  service: SERVICE_NAME,
  deletionPolicy: DELETION_POLICY,
  tableName: table => {
    return server.service + "-" + provider.provider.region + "-" + table;
  }
};
