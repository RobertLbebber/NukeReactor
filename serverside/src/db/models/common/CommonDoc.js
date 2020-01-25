import _ from "lodash";
import WebError from "../../../io/HttpErrors";

export default class CommonDoc {
  /**
   *
   * @param {*} Model
   * @param {String| Object} identity
   */
  constructor(Model, identity) {
    if (_.isNil(this.identity)) {
      throw new WebError(NOT_INSTANTIATED, `${this.Model.modelName}Doc was not provide an identity.`);
    }
    this.Model = Model;
    this.props = Singleton.props;
    this.pK = Singleton.pK;

    this.identity = identity;
  }
  /**@interface*/
  async save() {
    await this.Model.fn.create(this.identity);
  }
  async record() {
    return await this.Model.fn.record(this.identity);
  }
  async get(dynoExpression = {}) {
    if (_.isString(this.identity)) {
      return await this.Model.fn.get(this.identity, dynoExpression);
    } else {
      return await this.Model.fn.get(this.identity[this.pK], dynoExpression);
    }
  }
  async find(dynoExpression = {}) {
    return await this.Model.fn.scan(this.identity, dynoExpression);
  }
}
