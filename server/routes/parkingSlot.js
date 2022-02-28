const express = require('express');
const router = express.Router();

const {
    getAllParkingSlots,
    postNewParkingArea
} = require("../controllers/parkingSlotControllers.js")

//user profile routes
router
    .get("/allslots", getAllParkingSlots)
    .post("/saveparkingarea/:slotid", postNewParkingArea);

module.exports = router;