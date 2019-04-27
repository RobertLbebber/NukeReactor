import server from "./server.json";
import provider from "./provider.json";

export default {
  mainDB: "AWS::DynamoDB::Table",
  service: "rest-electr",
  tableName: table => {
    return server.service + "-" + provider.provider.region + "-" + table;
  }
};
