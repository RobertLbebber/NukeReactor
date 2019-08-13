import _ from "lodash";
import AWS from "aws-sdk";
import env, { DEVELOPMENT } from "../../config/env";
// let dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
let documentClient = new AWS.DynamoDB.DocumentClient();

const checkProps = (model, tableName, item) => {
  if (_.isNil(item)) {
    throw new Error("No query item provided for the Crud Action.");
  }
  for (let field in item) {
    if (model.props[field].type.constructor != item[field].constructor) {
      throw new Error(
        "Malformed query. Provided query type mismatches expected: '" +
          model.props[field].type.constructor +
          "' != '" +
          item[field].constructor +
          "'."
      );
    }
  }
};

/**
 * Updated
 */
export const create = (Model, TableName) => async Item => {
  checkProps(Model, TableName, Item);
  let params = { TableName, Item };
  return await documentClient.put(params).promise();
};

export const crement = (Model, TableName) => async Item => {
  checkProps(Model, TableName, Item);
  let params = { TableName, Item };
  return await documentClient.update(params).promise();
};
export const update = (Model, TableName) => async (Key, Item) => {
  checkProps(Model, TableName, Item);
  let params = { TableName, Key, Item };
  return await documentClient.update(params).promise();
};
export const createUpdate = (Model, TableName) => async (Key, Item) => {
  checkProps(Model, TableName, Item);
  let params = { TableName, Key, Item };
  let dbObj = await documentClient.get(params).promise();
  if (!_.isNil(dbObj)) {
    return await documentClient.update(params).promise();
  } else {
    return await documentClient.create(params).promise();
  }
};
export const remove = TableName => async Item => {
  checkProps(Model, TableName, Item);

  let params = { TableName, Item };
  return await documentClient.delete(params).promise();
};

/**
 * Select
 */
export const query = (Model, TableName) => async (item, dynoExpression) => {
  checkProps(Model, TableName, item);
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
    TableName,
    Key: {
      id: event.pathParameters.id
    },
    ...dynoExpression
  };

  return await documentClient.get(params).promise();
};

export const get = (Model, TableName) => async (Key, dynoExpression) => {
  let params = { TableName, Key, ...dynoExpression };
  return await documentClient.get(params).promise();
};

export const scan = (Model, TableName) => async () => {
  let params = { TableName };
  return await documentClient.scan(params).promise();
};

export default (Model, TableName) => {
  let functions = { get, query, create, crement, update, createUpdate, remove, scan };
  for (let func in functions) {
    functions[func] = functions[func](Model, TableName);
  }
  if (env.mode === DEVELOPMENT) {
    //Put methods that should be for Development only here
  }
  return functions;
};
