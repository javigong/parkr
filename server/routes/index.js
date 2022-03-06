const router = require("express").Router({ mergeParams: true });

const parkingSlotRouter = require("./parkingSlot.js");


router.use("/parkingslot", parkingSlotRouter);


module.exports = router;