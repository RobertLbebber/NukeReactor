"use strict";
// import AWS from "aws-sdk";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

module.exports.hello = (event, context, callback) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  const param = {
    TableName: "InvoiceConfig",
    Key: {
      providerName: {
        S: 1
      }
    }
  };

  documentClient.getItem(param, (err, data) => {
    console.log(err, data);
  });
  let response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };
  callback(null, response);
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: "Go Serverless v1.0! Your function executed successfully!", event };
};
