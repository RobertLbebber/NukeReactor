import _ from "lodash";
import AWS from "aws-sdk";
let dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const checkProps = item => {
  if (_.isNil(item)) {
    throw new Error("No query item provided for the Crud Action.");
  }
  for (key in item) {
    if (this.props[key].type.constructor != item[key].constructor) {
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
export const create = item => {
  checkProps(item);
};
export const crement = item => {
  checkProps(item);
};
export const update = item => {
  checkProps(item);
};
export const createUpdate = item => {
  checkProps(item);
};
export const remove = item => {
  checkProps(item);

  documentClient.delete(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};

/**
 * Select
 */
export const query = tableName => (item, dynoExpression) => {
  checkProps(item);
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

  let documentClient = new AWS.DynamoDB.DocumentClient();

  documentClient.get(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};

export const get = tableName => (item, dynoExpression) => {
  checkProps(item);
  marshalling.KeyConditionExpression = marshalling.KeyConditionExpression.join(" and ");
  let params = {
    TableName: tableName,
    Key: {
      ...item
    },
    ...dynoExpression
  };
};

export default { get, query, create, crement, update, createUpdate, remove };
