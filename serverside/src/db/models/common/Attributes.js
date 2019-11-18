import _ from "lodash";
import { Collection, Ref, SoftRef } from "./Types";

export const unique = {
  unique: true,
};
export const required = {
  required: true,
};
export const TYPES = {
  STRING: new String(),
  NUMBER: new Number(),
  FUNCTION: new Function(),
  JSON: new Object(),
  ARRAY: new Array(),
  DATE: new Date(),
  REGEXP: new RegExp(),
  SET: new Set(),
  REF: new Ref(null, false),
  SOFT_REF: new SoftRef(null, false),
  COLLECTION: new Collection(),
};

export const createRef = (foriegnModel, other) => {
  return { type: new Ref(foriegnModel), ...other };
};

export const createSoftRef = (foriegnModel, other) => {
  return { type: new SoftRef(foriegnModel), ...other };
};

export const createCollection = (foriegnModel, other) => {
  return { type: new Collection(foriegnModel), ...other };
};

/**
 *
 */
export const typeGn = (type = TYPES.STRING /*, reference , self*/) => {
  // if (type == TYPES.REF || type == TYPES.COLLECTION) {
  //   if (!_.isNil(reference)) {
  //     throw new Error("Missing 'reference' Parameter for Type Definition on " + new type().constructor.name);
  //   }
  //   // if (_.isNil(self)) {
  //   //   throw new Error("Missing 'self' Parameter for Type Definition");
  //   // }
  //   return { type, reference: new type(reference /*, self*/) };
  //   // } else if (!_.isNil(self)) {
  //   //   throw new Error("Missing 'reference' Parameter for Type Definition");
  // } else {
  return { type };
  // }
};

/**
 * Props
 */
export const createdDate = typeGn(TYPES.DATE);
export const updatedDate = typeGn(TYPES.DATE);
export const id = typeGn();

export default { createdDate, updatedDate, id };
