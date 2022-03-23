const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({
    origin: ['http://localhost:4000', 'http://127.0.0.1:4000', 'https://www.parkr-api.com']
}));

//const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;

app.use(morgan('tiny'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
}));

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