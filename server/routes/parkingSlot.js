const express = require('express');
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
    .get("/allslots", getAllParkingSlots)
    .get("/buildinginfo", getBuildingInfo)
    .get("/userprofiles", getUserProfiles)
    .get("/incoming/:useremail", getMyActivityIncoming)
    .get("/current/:useremail", getMyActivityCurrent)
    .get("/expired/:useremail", getMyActivityExpired)
    .get("/carlist/:useremail", getCarListByUser)
    .post("/saveparkingarea/:slotid", postNewParkingArea);

module.exports = router;