/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 *
 *
 *
 *
 *
 *
 * All Webpages will be dropped.
 */

module.exports.routes = {
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗  ╔═╗╔ ╗╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗  ║  ║ ║╚═╗ ║ ║ ║║║║╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝  ╚═╝╚═╝╚═╝ ╩ ╚═╝╩ ╩╚═╝

  //    PAGE BUILDER CONTROLLER
  "GET /createDefaultTemplate": { action: "PageBuilder/createDefaultTemplate" },
  "GET /getDefaultTemplate": { action: "PageBuilder/getDefaultTemplate" },

  //    ACCOUNTS CONTROLLER
  "GET /account/:id": { action: "account/Account/getAccount" },
  "POST /account/update/:accountID": { action: "account/Account/saveUserData" },
  "POST /account/addAccount": { action: "account/Account/addAccount" },
  "GET /account/getAll": { action: "account/Account/getAll" },

  "GET /getMe": { action: "account/Account/getMe" },
  "GET /logout": { action: "account/Account/logout" },
  "GET /createDefaultUser": { action: "account/Account/createDefaultUser" },

  "POST /debug/account/runQuery": { action: "account/Account/runQuery" },
  // //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  // //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  // //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  // "GET /": { action: "view-homepage-or-redirect" },
  // "GET /welcome": { action: "dashboard/view-welcome" },

  // "GET /faq": { view: "pages/faq" },
  // "GET /legal/terms": { view: "pages/legal/terms" },
  // "GET /legal/privacy": { view: "pages/legal/privacy" },
  // "GET /contact": { view: "pages/contact" },

  // "GET /signup": { action: "entrance/view-signup" },
  // "GET /email/confirm": { action: "entrance/confirm-email" },
  // "GET /email/confirmed": { view: "pages/entrance/confirmed-email" },

  // "GET /login": { action: "entrance/view-login" },
  // "GET /password/forgot": { action: "entrance/view-forgot-password" },
  // "GET /password/new": { action: "entrance/view-new-password" },

  // "GET /account": { action: "account/view-account-overview" },
  // "GET /account/password": { action: "account/view-edit-password" },
  // "GET /account/profile": { action: "account/view-edit-profile" },

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗  ╔═╗╔═╗╔═╗╔═╗╔ ╗╔  ╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗  ║ ║║╣ ╠═ ╠═╣║ ║║   ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝  ╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  "PUT   /account/update-password": {
    action: "account/update-password"
  },
  "PUT   /account/update-profile": { action: "account/update-profile" },
  "PUT   /account/update-billing-card": {
    action: "account/update-billing-card"
  },
  "/entrance/logout": { action: "entrance/logout" },
  "POST  /entrance/login": { action: "account/Account/login" },
  "POST  /entrance/signup": { action: "account/Account/signup" },
  // action: "entrance/signup"},
  "POST  /entrance/send-password-recovery-email": {
    action: "entrance/send-password-recovery-email"
  },
  "POST  /entrance/update-password-and-login": {
    action: "entrance/update-password-and-login"
  },
  "POST  /deliver-contact-form-message": {
    action: "deliver-contact-form-message"
  },

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  "/terms": "/legal/terms",
  "/logout": "/account/logout"
};
