const router = require("express").Router({ mergeParams: true });

const parkingSlotRouter = require("./parkingSlot.js");
const reservationRouter = require("./reservation.js");


router.use("/parkingslot", parkingSlotRouter);
router.use("/reservation", reservationRouter);


module.exports = router;