/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

module.exports.globals = {
  /****************************************************************************
   *                                                                           *
   * Whether to expose the locally-installed Lodash as a global variable       *
   * (`_`), making  it accessible throughout your app.                         *
   * (See the link above for help.)                                            *
   *                                                                           *
   ****************************************************************************/

  _: require("lodash"),

  /****************************************************************************
   *                                                                           *
   * Whether to expose the locally-installed `async` as a global variable      *
   * (`async`), making it accessible throughout your app.                      *
   * (See the link above for help.)                                            *
   *                                                                           *
   ****************************************************************************/

  async: require("async"),

  /****************************************************************************
   *                                                                           *
   * Whether to expose each of your app's models as global variables.          *
   * (See the link at the top of this file for more information.)              *
   *                                                                           *
   ****************************************************************************/

  models: true,

  /****************************************************************************
   *                                                                           *
   * Whether to expose the Sails app instance as a global variable (`sails`),  *
   * making it accessible throughout your app.                                 *
   *                                                                           *
   ****************************************************************************/

  sails: true,

  dev: {
    react_server: "localhost:1337",
    sails_server: "localhost:3000",
    dev_mode: true,
    defaultAccount: {
      email: "bebber@electr.net",
      firstName: "Robert",
      lastName: "Bebber",
      password: "q"
    }
  }
};
