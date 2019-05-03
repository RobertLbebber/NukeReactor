const DEVSERVER = true;
//DEVSERVER ? "http://localhost:1338/" :
var devvar = {
  DOMAIN: "http://localhost:1337/",
  LOCAL: "http://localhost:3000/",
  SLOGAN: "A True Political Connection",
  CREATORS: "Robert Bebber",
  COMPANY_NAME: "Electr"
};

var Debug = {
  enforceAccount: true
};

module.exports = {
  devvar,
  Debug
};
