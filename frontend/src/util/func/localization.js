// import Moment from "moment";

let dateOptions = { year: "numeric", month: "long", day: "numeric" };

export function getLocal(localization, date, options = dateOptions) {
  // let age = Moment().subtract(date, "milliseconds");
  // let age = currentDate-Moment(date);
  return new Date(date).toLocaleDateString(localization, options);
}
