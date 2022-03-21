const verifyToken = require('../auth/middleware.js');
const router = require('express').Router({ mergeParams: true });
const {
    findAll,
    createReservation
} = require("../controllers/reservationControllers.js")

//reservation routes
router
    .get("/", verifyToken, findAll)
    .post("/savereservation", verifyToken, createReservation);

module.exports = router;