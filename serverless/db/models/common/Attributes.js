import _ from "lodash";
import {Collection,Ref} from "./Types"

export const unique = {
  unique: true
};
export const required = {
  required: true
};
export const type = {
  STRING: { type: new String() },
  NUMBER: { type: new Number() },
  FUNCTION: { type: new Function() },
  JSON: { type: {} },
  ARRAY: { type: new Array() },
  DATE: { type: new Date() },
  REGEXP: { type: new RegExp() },
  SET: { type: new Set() },
  REF: { type: new Ref() }
  COLLECTION: { type: new Collection() }
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
