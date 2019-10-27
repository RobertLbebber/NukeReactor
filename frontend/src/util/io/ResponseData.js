/**
 * Creates a shape for response data
 */
export default class ResponseData {
  constructor(ok, status, data) {
    this.data = this.json = data;
    this.status = this.code = status;
    this.ok = ok;
  }
}
