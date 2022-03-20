const express = require('express');
const verifyToken = require('../auth/middleware.js');
const router = express.Router();

const {
    getAllParkingSlots,
    getBuildingInfo,
    getUserProfiles,
    getMyActivityCurrent,
    getMyActivityIncoming,
    getMyActivityExpired,
    getCarListByUser,
    getAvailabilityByDate,
    postNewParkingArea,
    createReservation
} = require("../controllers/parkingSlotControllers.js")

//user profile routes
router
    .get("/allslots", verifyToken, getAllParkingSlots)
    .get("/buildinginfo", verifyToken, getBuildingInfo)
    .get("/userprofiles", verifyToken, getUserProfiles)
    .get("/incoming/:useremail", getMyActivityIncoming)
    .get("/current/:useremail", verifyToken, getMyActivityCurrent)
    .get("/expired/:useremail", verifyToken, getMyActivityExpired)
    .get("/carlist/:useremail", verifyToken, getCarListByUser)
    .get("/checkavailability/:date", verifyToken, getAvailabilityByDate)
    .post("/saveparkingarea/:slotid", verifyToken, postNewParkingArea)
    .post("/savereservation", createReservation);

module.exports = router;