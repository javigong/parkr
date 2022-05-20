const verifyToken = require('../auth/middleware.js');
const router = require('express').Router({ mergeParams: true });

const {
    getAllParkingSlots,
    getAllHostSlots,
    getBuildingInfo,
    getUserProfiles,
    getMyActivityCurrent,
    getMyActivityIncoming,
    getMyActivityExpired,
    getHostCurrentIncoming,
    getHostExpired,
    getCarListByUser,
    getAvailabilityByDate,
    getAvailabilityByDateWeekly,
    getAvailabilityByDateMonthly,
    putParkingSlot
} = require("../controllers/parkingSlotControllers.js")

//user profile routes
router
    .get("/allslots", verifyToken, getAllParkingSlots)
    .get("/hostslots/:hostemail", verifyToken, getAllHostSlots)
    .get("/buildinginfo", verifyToken, getBuildingInfo)
    .get("/userprofiles", verifyToken, getUserProfiles)
    .get("/incoming/:useremail", verifyToken, getMyActivityIncoming)
    .get("/current/:useremail", verifyToken, getMyActivityCurrent)
    .get("/expired/:useremail", verifyToken, getMyActivityExpired)
    .get("/currentandincoming/:hostemail", verifyToken, getHostCurrentIncoming)
    .get("/expiredhostactivity/:hostemail", verifyToken, getHostExpired)
    .get("/carlist/:useremail", verifyToken, getCarListByUser)
    .get("/checkavailability/:date", verifyToken, getAvailabilityByDate)
    .get("/checkavailabilityweekly/:date", verifyToken, getAvailabilityByDateWeekly)
    .get("/checkavailabilitymonthly/:date", verifyToken, getAvailabilityByDateMonthly)
    .put("/saveparkingslot", verifyToken, putParkingSlot);
module.exports = router;