import React from "react";
import ReactDOM from "react-dom";
// import "./less.js";
import Index from "./routes/Index";
import "bootstrap/dist/css/bootstrap.css";
import "./build/index.css";
// import "./index.css";
import "./assets/css/bootstrap3.3.1.css";

ReactDOM.render(<Index />, document.getElementById("root"));
module.hot.accept();
