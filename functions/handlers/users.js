const { db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
  let userID, token;

  const newUser = {
    email: req.body.email,
    pass: req.body.pass,
    confirmPass: req.body.confirmPass,
    handle: req.body.handle,
  };

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists)
        return res.status(400).json({ handle: `el handle ya existe` });
      else
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.pass);
    })
    .then((data) => {
      userID = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        handle: newUser.handle,
        createdAt: new Date().toISOString(),
        userID,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    pass: req.body.pass,
  };

  let errors = {};

  if (!user.email) errors.email = "Must not be empty";
  if (!user.pass) errors.pass = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.pass)
    .then((data) => {
      authenticatedUser = data.user.email;
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(200).json({ token, authenticatedUser });
    })
    .catch((err) => {
        console.log(console.log(err));
        return res.status(400).json({ err: err.code });
    });
};
