import _ from "lodash";

const checkDetection = (refId, foreignModel) => {
  if (_.isNil(entryExist)) {
    let error =
      "No Entry for given Foreign Key: '" +
      refId +
      "' not found in '" +
      _.get(foreignModel, "modelName", " No Foreign Model") +
      "'.";
    console.error(error);
    throw new Error(error);
  }
};

export class Ref {
  /**
   * @param {Model} foreigner - reference to an instance of a foreign model
   * @param {String} connection - prop being used for connecting the models
   */
  constructor(foreigner, validate = true) {
    // console.log("Types.js", foreigner);
    if (validate) {
      this.foreignModel = foreigner;
      this.foreignKey = foreigner.primaryKey;
      if (_.isNil(this.foreignModel)) {
        throw new Error("No foriegn Model provided for Reference");
      }
    }
  }

  async validator(refId) {
    if (_.isNil(this.foreignModel)) {
      throw new Error("No foriegn Model provided for Reference");
    } else if (_.isNil(refId)) {
      throw new Error("Foreign Model lacks identification for Reference");
    }

    let entryExist = await this.foreignModel.get({ [this.foreignKey]: refId });
    console.log("Typesjs: Foriegn Model Result Object:", entryExist);
    checkDetection(entryExist, refId, this.foreignModel);

    return entryExist;
  }
}

/**
 * Doesn't Require
 */
export class SoftRef {
  /**
   * @param {Model} foreigner - reference to an instance of a foreign model
   * @param {String} connection - prop being used for connecting the models
   */
  constructor(foreigner, validate = true) {
    if (validate) {
      this.foreignModel = foreigner;
      this.foreignKey = foreigner.primaryKey;
      this.locked = false;
      if (_.isNil(this.foreignModel)) {
        throw new Error("No foriegn Model provided for Reference");
      }
    }
  }

  async validator(refId) {
    if (_.isNil(this.foreignModel)) {
      throw new Error("No foriegn Model provided for Reference");
    } else if (_.isNil(refId)) {
      throw new Error("Foreign Model lacks identification for Reference");
    }
    let entryExist = await this.foreignModel.get({ [this.foreignKey]: refId });
    console.log("Typesjs: Foriegn Model Result Object:", entryExist);
    if (!this.locked && !_.isNil(entryExist)) {
      this.locked = true;
    } else if (this.locked) {
      checkDetection(entryExist, refId, this.foreignModel);
    }
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
  async validator(refId) {}
}
