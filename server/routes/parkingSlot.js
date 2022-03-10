const express = require('express');
const router = express.Router();

const {
    getAllParkingSlots,
    getBuildingInfo,
    getUserProfiles,
    postNewParkingArea
} = require("../controllers/parkingSlotControllers.js")

//user profile routes
router
    .get("/allslots", getAllParkingSlots)
    .get("/buildinginfo", getBuildingInfo)
    .get("/userprofiles", getUserProfiles)
    .post("/saveparkingarea/:slotid", postNewParkingArea);

module.exports = router;