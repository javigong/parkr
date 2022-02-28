const parkingSlot = require("../routes/parkingSlot.js");

exports.getAllParkingSlots = (req, res, next) => {
    //req.params.userEmail
    DailyLog.find({ userEmailAddress: req.params.userEmail })
        .sort({ dailyLogDate: 'asc' })
        .exec()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => res.status(500).send(error));




};

exports.postNewParkingArea = (req, res, next) => {
    res.send("Saved new parking slot")
};