const DEVSERVER = true;
//DEVSERVER ? "http://localhost:1338/" :
const devvar = {
  DOMAIN: "http://localhost:1337/",
  LOCAL: "http://localhost:3000/",
  SLOGAN: "A True Political Connection",
  CREATORS: "Robert Bebber",
  COMPANY_NAME: "Electr"
};

const Debug = {
  enforceAccount: false
};

module.exports = {
  devvar,
  Debug
};
