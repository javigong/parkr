const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const googleAppCredentials = require("../config/google_app_credentials.json");

//firebase admin sdk
const app = initializeApp({
  credential: cert(googleAppCredentials),
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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
        console.log("Authorized request: Valid Bearer Token");
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    return res
      .status(401)
      .send({ message: "Unauthorized request: Invalid Bearer Token" });
  }
};

module.exports = verifyToken;
