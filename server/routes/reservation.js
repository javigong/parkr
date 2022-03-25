const verifyToken = require('../auth/middleware.js');
const router = require('express').Router({ mergeParams: true });
const {
    findAll,
    createReservation,
    cancelReservation
} = require("../controllers/reservationControllers.js")

//reservation routes
router
    .get("/", verifyToken, findAll)
    .put("/savereservation", verifyToken, createReservation)
    .patch("/cancelreservation/:bookingid", verifyToken, cancelReservation);

module.exports = router;