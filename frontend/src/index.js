import React from "react";
import ReactDOM from "react-dom";
import Index from "./routes/Index";
import "./build/index.css";

// import "./css/animate.min.css";
import "./assets/css/bootstrap4.2.1.css";
// import "./assets/css/bootstrap3.3.1.css";
import "./assets/css/demo.css";
import "./assets/css/generic.css";
import "./assets/css/global.css";
import "./assets/css/pe-icon-7-stroke.css";

ReactDOM.render(<Index />, document.getElementById("root"));
module.hot.accept();
