import _ from "lodash";
import AWS from "aws-sdk";
import env, { DEVELOPMENT } from "../../config/env";
// let dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
let documentClient = new AWS.DynamoDB.DocumentClient();

const checkProps = tableName => async item => {
  if (_.isNil(item)) {
    console.log("No query item provided for the Crud Action.");
    throw new Error("No query item provided for the Crud Action.");
  }
  for (key in item) {
    if (this.props[key].type.constructor != item[key].constructor) {
      console.log(
        "Malformed query. Provided query type mismatches expected: '" +
          this.props[key].type.constructor +
          "' != '" +
          item[key].constructor +
          "'."
      );
      throw new Error(
        "Malformed query. Provided query type mismatches expected: '" +
          this.props[key].type.constructor +
          "' != '" +
          item[key].constructor +
          "'."
      );
    }
  }
};
/**
 * Updated
 */
export const create = TableName => async Item => {
  checkProps(TableName)(Item);
  let params = { TableName, Item };
  console.log(params);
  return await documentClient.put(params);
};

export const crement = TableName => async Item => {
  checkProps(TableName)(Item);
};
export const update = TableName => async (Key, Item) => {
  checkProps(TableName)(Item);
  let params = { TableName, Key, Item };
  return await documentClient.update(params);
};
export const createUpdate = TableName => async (Key, Item) => {
  checkProps(TableName)(Item);
  let params = { TableName, Key, Item };
  let dbObj = await documentClient.get(params);
  if (!_.isNil(dbObj)) {
    return await documentClient.update(params);
  } else {
    return await documentClient.create(params);
  }
};
export const remove = tableName => async Item => {
  checkProps(TableName)(Item);

  let params = { TableName, Item };
  return await documentClient.delete(params);
};

/**
 * Select
 */
export const query = tableName => async (item, dynoExpression) => {
  checkProps(TableName)(item);
  let marshalling = { KeyConditionExpression: [], ExpressionAttributeValues: {} };
  for (key in item) {
    let value = item[key];
    if (_.isArray(value)) {
      if (value.length === 2) {
        marshalling.KeyConditionExpression.push(key + " " + value[1] + " :" + _.startCase(key));
        marshalling.ExpressionAttributeValues[":" + _.startCase(key)] = value[0];
      } else {
        if (_.isNil(value[0])) {
          throw new Error("Value for query not provided with respect to key: " + key);
        }
        console.warn("Invalid use of query item value array. Defaulting to match value.");
        marshalling.KeyConditionExpression.push(key + " = :" + _.startCase(key));
        marshalling.ExpressionAttributeValues[":" + _.startCase(key)] = value[0];
      }
    } else {
      marshalling.KeyConditionExpression.push(key + " = :" + _.startCase(key));
      marshalling.ExpressionAttributeValues[":" + _.startCase(key)] = value;
    }
  }
  marshalling.KeyConditionExpression = marshalling.KeyConditionExpression.join(" and ");
  let params = {
    TableName: tableName,
    Key: {
      id: event.pathParameters.id
    },
    ...dynoExpression
  };

  return await documentClient.get(params);
};

export const get = TableName => async (Key, dynoExpression) => {
  let params = {
    TableName,
    Key,
    ...dynoExpression
  };
  return await documentClient.get(params);
};

export const scan = tableName => async () => {
  let params = { TableName: tableName };
  return await documentClient.scan(params);
};

const exportable = name => {
  let functions = { get, query, create, crement, update, createUpdate, remove, scan };
  for (let func in functions) {
    functions[func] = functions[func](name);
  }
  if (env.mode === DEVELOPMENT) {
    //Put methods that should be for Development only here
  }
  return functions;
};
export default exportable;
