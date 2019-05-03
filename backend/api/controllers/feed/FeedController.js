import { mkDir, mkFile } from "../../utils/make-fs";
import _ from "lodash";
/**
 * FeedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let savePost = async function(req, res) {
  sails.log("Hit End Point", req.body);
  let id = JSON.parse(req.cookies.UID);
  //ES6
  await Messages.create({ mainMessage: req.body.mainMessage, accountId: id });
};

module.exports = {
  savePost
};
