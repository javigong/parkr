const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const googleAppCredentials = require("../config/google_app_credentials.json");

//firebase admin sdk
const app = initializeApp({
  credential: cert(googleAppCredentials),
  apiKey: "AIzaSyAIYaUqhUiWor-4am_U8Vs4A7dry_5Q2F0",
  authDomain: "parkr-auth.firebaseapp.com",
  projectId: "parkr-auth",
  storageBucket: "parkr-auth.appspot.com",
  messagingSenderId: "1013744309561",
  appId: "1:1013744309561:web:66f2970dd44d6eb47144e8",
});

const auth = getAuth(app);

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .send({ message: "Didn't find authorization header in request" });
  }

  const token = authHeader && authHeader.split("Bearer ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized request: no authorization header" });
  }

  try {
    // token comes from the client app
    auth
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        if (!uid) {
          return res.status(401).end();
        }
        console.log("## valid bearer token ##");
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    return res
      .status(401)
      .send({ message: "Unauthorized request: invalid token" });
  }
};

module.exports = verifyToken;
