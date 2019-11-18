import _ from "lodash";
import GenerateController from "./GenerateController";
import { Models } from "../../db/models/_export.json";

export class GenericController {
  constructor() {
    this.endpoints = {};

    const ModelsObjects = _.map(Models, Model => new Model());
    this.models = _.keyBy(ModelsObjects, modelsObject => modelsObject.constructor.name);
    _.each(this.models, model => {
      if (!_.isNil(model.associate)) {
        model.associate(this.models);
      }
      Object.preventExtensions(model);
    });
  }
  getName = () => this.constructor.name;
  /**
   * Opens up a Stream to create a endpoint
   *
   * @param {String} name - Name of the Endpoint
   */
  create = name => GenerateController.init(name, this);
}
