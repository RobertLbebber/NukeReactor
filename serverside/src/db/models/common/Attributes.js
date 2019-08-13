import _ from "lodash";
import { Collection, Ref } from "./Types";

export const unique = {
  unique: true
};
export const required = {
  required: true
};
export const TYPES = {
  STRING: String,
  NUMBER: Number,
  FUNCTION: Function,
  JSON: Object,
  ARRAY: Array,
  DATE: Date,
  REGEXP: RegExp,
  SET: Set,
  REF: Ref,
  COLLECTION: Collection
};

/**
 *
 */
export const type = (type = new TYPES.STRING(), reference, self) => {
  if (!_.isNil(reference)) {
    if (_.isNil(self)) {
      throw new Error("Missing 'self' Parameter for Type Definition");
    }
    return { type, reference: new type(reference, self) };
  } else if (!_.isNil(self)) {
    throw new Error("Missing 'reference' Parameter for Type Definition");
  } else {
    return { type };
  }
};

/**
 * Props
 */
export const createdDate = type(new TYPES.DATE());
export const updatedDate = type(new TYPES.DATE());
export const id = type();

export default { createdDate, updatedDate, id };
