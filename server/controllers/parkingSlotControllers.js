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

exports.getBuildingInfo = async(req, res, next) => {
    try {
        const [buildingInfo, _] = await ParkingArea.getBuildingInformation();

        res.status(200).json({ buildingInfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getUserProfiles = async(req, res, next) => {
    try {
        const [userProfiles, _] = await ParkingArea.fetchUserProfiles();

        res.status(200).json({ userProfiles });
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