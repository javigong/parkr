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
    postNewParkingArea
} = require("../controllers/parkingSlotControllers.js")

//user profile routes
router
    .get("/allslots", verifyToken, getAllParkingSlots)
    .get("/buildinginfo", verifyToken, getBuildingInfo)
    .get("/userprofiles", verifyToken, getUserProfiles)
    .get("/incoming/:useremail", verifyToken, getMyActivityIncoming)
    .get("/current/:useremail", verifyToken, getMyActivityCurrent)
    .get("/expired/:useremail", verifyToken, getMyActivityExpired)
    .get("/carlist/:useremail", verifyToken, getCarListByUser)
    .post("/saveparkingarea/:slotid", verifyToken, postNewParkingArea);

module.exports = router;