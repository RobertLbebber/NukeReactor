/**
 * Creates a shape for response data
 */
export default class ResponseData {
  constructor(ok, status, data) {
    this.data = data;
    this.status = status;
    this.ok = ok;
  }
}
