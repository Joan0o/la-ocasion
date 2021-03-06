const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return next();
    })
    //     return db.collection('users')
    //         .where('userID', '==', req.user.uid)
    //         .limit(1)
    //         .get();
    // })
    // .then(data => {
    //     req.user.handle = data.docs[0].data().handle
    //     return next()
    // })
    .catch((err) => {
      return res.status(500).json({ error: err.errorInfo.code });
    });
};
