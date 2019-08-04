import _ from "lodash";
export class Ref {
  /**
   * @param {Model} foreigner - reference to an instance of a foreign model
   * @param {String} connection - prop being used for connecting the models
   */
  constructor(foreigner, connection) {
    this.model = foreigner;
    this.prop = connection;
    if (_.isNil(this.prop)) {
      this.prop = foreigner.primaryKey;
    }
    if (_.isNil(this.model)) {
      throw new Error("No foriegn Model provided for Reference");
    }
  }

  async validator(refId) {
    if (_.isNil(this.model)) {
      throw new Error("No foriegn Model provided for Reference");
    } else if (_.isNil(refId)) {
      throw new Error("Foreign Model lacks identification for Reference");
    }
    let result = await this.model.get({ [this.prop]: refId });
    return result;
  }
}

export class Collection {
  /**
   * @param {Model} foreigner - reference to an instance of a foreign model
   */
  constructor(foreigner, self) {
    // if (_.isNil(foreigner)) {
    //   throw new Error("No foriegn Model provided for Reference");
    // } else if (_.isNil(foreigner.primaryId)) {
    //   throw new Error("Foriegn Model lacks identification for Reference");
    //   // } else if (_.isNil(self)) {
    //   //   throw new Error("");
    // }
    // let type = foreigner.primaryId.type;
    // let id = foreigner.primaryId;
  }
}
