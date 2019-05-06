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
export const type = (type = TYPES.STRING, reference) => {
  if (!_.isNil(reference)) {
    return { type, reference: new type(reference, this) };
  } else {
    return { type };
  }
};

/**
 * Props
 */
export const createdDate = {
  createdDate: { ...type.DATE }
};
export const updatedDate = {
  updatedDate: { ...type.DATE }
};
export const id = {
  id: { ...type.STRING }
};

export default {
  createdDate,
  updatedDate,
  id
};
