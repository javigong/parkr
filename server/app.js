const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({
    origin: ['http://localhost:4000']
}));
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const googleAppCredentials = require('./config/google_app_credentials.json');

//const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;

//app.use(cookieParser);
app.use(morgan('tiny'));

app.get('/api/test', (req, res) => {
    const message = {
        message: 'Welcome to PARKR server.'
    };
    res.json(message);
})

////////////////////////////Route////////////////////////////
const router = require("./routes/index.js");
app.use("/", router);
/////////////////////////////////////////////////////////////

app.listen(PORT, () => console.log(`Server is starting at ${PORT}`));

//firebase admin sdk
initializeApp({
    credential: admin.credential.cert(googleAppCredentials),
    apiKey: "AIzaSyAIYaUqhUiWor-4am_U8Vs4A7dry_5Q2F0",
    authDomain: "parkr-auth.firebaseapp.com",
    projectId: "parkr-auth",
    storageBucket: "parkr-auth.appspot.com",
    messagingSenderId: "1013744309561",
    appId: "1:1013744309561:web:66f2970dd44d6eb47144e8"
});
