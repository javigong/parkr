const ParkingArea = require("../model/parkingArea.js");

exports.getAllParkingSlots = async(req, res, next) => {
    try {
        const [parkingSlots, _] = await ParkingArea.findAll();

        res.status(200).json({ parkingSlots });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.postNewParkingArea = (req, res, next) => {

    try {
        console.log(req.body);

        const newParkingArea = _ParkingArea.save();

        res.status(201).json({ message: "Saved new parking slot" });

    } catch (error) {
        console.log(error);
        next(error);
    }

};