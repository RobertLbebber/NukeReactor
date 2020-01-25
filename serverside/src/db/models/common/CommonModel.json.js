import CommonDBCrud from "../../oper/CommonDBCrud";
import CommonAttributes from "./Attributes";

export default class CommonModel {
  constructor(name) {
    this.primaryKey = "id";
    this.modelName = name;
    this.props = CommonAttributes;
    this.fn = CommonDBCrud(this);
  }
  /**@interface*/
  init() {}
}
