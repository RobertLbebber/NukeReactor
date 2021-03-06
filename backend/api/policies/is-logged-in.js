module.exports = async function(req, res, proceed) {
  if (!req.cookies || !req.cookies.UID) {
    res.status(410);
    return res.send({ errorMessage: "Account Not Active" });
  } else {
    Account.findOne({ id: JSON.parse(req.cookies.UID) })
      .decrypt()
      .exec(function(err, result) {
        if (_.isNil(result) || err) {
          return res.forbidden();
        }
        return proceed();
      });
  }
};
