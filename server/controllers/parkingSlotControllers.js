const ParkingArea = require("../model/parkingArea.js");
const db = require("../config/config.js");

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


exports.getUserProfiles = async(req, res, next) => {
    try {
        const [userProfiles, _] = await ParkingArea.fetchUserProfiles();

        res.status(200).json({ userProfiles });
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

exports.getMyActivityCurrent = async(req, res, next) => {
    try {
        console.log(req.params.useremail);

        const [userProfiles, _] = await ParkingArea.userActivityInUse(req.params.useremail);

        res.status(200).json({ userProfiles });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getMyActivityIncoming = async(req, res, next) => {
    try {
        console.log(req.params.useremail);
        const [userProfiles, _] = await ParkingArea.userActivityUpcoming(req.params.useremail);

        res.status(200).json({ userProfiles });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getMyActivityExpired = async(req, res, next) => {
    try {
        console.log(req.params.useremail);
        const [userProfiles, _] = await ParkingArea.userActivityExpired(req.params.useremail);

        res.status(200).json({ userProfiles });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



exports.getAvailabilityByDate = async(req, res, next) => {
    try {
        console.log(req.params.date);
        const [spotAvailability, _] = await ParkingArea.checkAvailabilityByDate(req.params.date);
        res.status(200).json({ spotAvailability });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


exports.getCarListByUser = async(req, res, next) => {
    try {
        const [userProfiles, _] = await ParkingArea.getCarHistoryByUser(req.params.useremail);

        res.status(200).json({ userProfiles });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


exports.postNewParkingArea = (req, res, next) => {

    try {
        console.log(req.body);
        let _parkingInfo = req.body;
        console.log(req.body);
        let sql = `INSERT INTO parkingarea (idParkingSlot,paUnitNo,paVehicleType,paStatus,paVisitorId,paFee)VALUES(?,?,?,?,?,?)`;

        db.query(sql, [_parkingInfo.idParkingSlot, _parkingInfo.paUnitNo, _parkingInfo.paVehicleType, _parkingInfo.paStatus, _parkingInfo.paVisitorId, _parkingInfo.paFee], (err, results) => {

                if (!err) {
                    return res.status(200).json({ message: "Parking slot added" });
                }
            })
            //const [_parkingSlotInformation, _] = ParkingArea.save(req.body);

    } catch (error) {
        console.log(error);
        next(error);
    }

};