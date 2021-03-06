module.exports = {
  friendlyName: "Signup",

  description: "Sign up for a new user account.",

  extendedDescription: `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,

  inputs: {
    body: {
      type: "ref"
    },

    emailAddress: {
      // required: true,
      type: "string",
      isEmail: true,
      description: "The email address for the new account, e.g. m@example.com.",
      extendedDescription: "Must be a valid email address."
    },

    password: {
      // required: true,
      type: "string",
      maxLength: 200,
      example: "passwordlol",
      description: "The unencrypted password to use for the new account."
    },

    confirmation: {
      // required: true,
      type: "string",
      maxLength: 200,
      example: "passwordlol",
      description: "The unencrypted password to use for the new account."
    },

    fName: {
      // required: true,
      type: "string",
      example: "John",
      description: "The user's first name."
    },

    lName: {
      // required: true,
      type: "string",
      example: "Smiths",
      description: "The user's last name."
    }
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided parameters are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent."
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: "The provided email address is already in use."
    },

    badPassword: {
      statusCode: 409,
      description: "The provided password is invalid."
    }
  },

  fn: async function(inputs, exits) {
    console.log(inputs);
    var newEmailAddress = inputs.emailAddress.toLowerCase();

    if (inputs.password !== inputs.confirmation) {
      throw "badPassword";
    }
    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await Account.create(
      Object.assign(
        {
          email: newEmailAddress,
          password: inputs.password,
          confirmation: inputs.confirmation,
          firstName: inputs.fName,
          lastName: inputs.lName,
          tosAcceptedByIp: this.req.ip
        },
        sails.config.custom.verifyEmailAddresses
          ? {
              emailProofToken: await sails.helpers.strings.random(
                "url-friendly"
              ),
              emailProofTokenExpiresAt:
                Date.now() + sails.config.custom.emailProofTokenTTL,
              emailStatus: "unconfirmed"
            }
          : {}
      )
    )
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      // .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        emailAddress: newEmailAddress
      });
      await User.update(newUserRecord.id).set({
        stripeCustomerId
      });
    }

    // Store the user's new id in their session.
    this.req.session.userId = newUserRecord.id;

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: "Please confirm your account",
        template: "email-verify-account",
        templateData: {
          fullName: inputs.fullName,
          token: newUserRecord.emailProofToken
        }
      });
    } else {
      sails.log.info(
        "Skipping new account email verification... (since `verifyEmailAddresses` is disabled)"
      );
    }

    await PageTemplates.createDefaultTemplate(newUserRecord.id);

    await Account.update(
      { id: newUserRecord.id },
      {
        pageContent: await PageTemplates.getDefaultTemplate().accountId
      }
    );

    this.req.session.user = newUserRecord;

    sails.log("Session in Signin: ", this.req.session);
    // Since everything went ok, send our 200 response.
    return this.res.json(Account.getPublicData(newUserRecord));
  }
};
