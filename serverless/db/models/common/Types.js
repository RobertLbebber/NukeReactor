export class Ref {
  /**
   * @param {Model} foreigner - reference to an instance of a foreign model
   * @param {Model} self - reference to the calling model
   */
  constructor(foreigner, self) {
    if (_.isNil(foreigner)) {
      throw new Error("No foriegn Model provided for Reference");
    } else if (_.isNil(foreigner.primaryId)) {
      throw new Error("Foriegn Model lacks identification for Reference");
      // } else if (_.isNil(self)) {
      //   throw new Error("");
    }
    let type = foreigner.primaryId.type;
    let id = foreigner.primaryId;
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
