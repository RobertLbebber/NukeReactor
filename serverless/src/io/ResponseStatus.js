const ResponseStatus = (ok = true, payload = "Successful", statusCode = ok ? 200 : 495) => {
  let response = { ok, statusCode };
  if (payload.constructor == String) {
    response.message = payload;
  } else {
    response.body = payload;
  }
};

export const GET = "get";
export const POST = "post";

export default ResponseStatus;
