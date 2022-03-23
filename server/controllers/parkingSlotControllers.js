const ParkingArea = require("../model/parkingArea.js");
const db = require("../config/config.js");


exports.getAllParkingSlots = (req, res) => {

    ParkingArea.findAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No parking slots info.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving parking slots info"
                });
            }
        } else res.send(data);
    });


};

exports.getBuildingInfo = (req, res) => {
    ParkingArea.getBuildingInformation((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No building info.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving building info"
                });
            }
        } else res.send(data);
    });
};

exports.getUserProfiles = (req, res) => {

    ParkingArea.fetchUserProfiles((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No profiles.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving profiles"
                });
            }
        } else res.send(data);
    });

};

exports.getMyActivityCurrent = (req, res) => {

    ParkingArea.userActivityInUse(req.params.useremail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found current activity with user id ${req.params.useremail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error current incoming activity with user id" + req.params.useremail
                });
            }
        } else res.send(data);
    });

};

exports.getMyActivityIncoming = (req, res) => {
    ParkingArea.userActivityUpcoming(req.params.useremail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found incoming activity with user id ${req.params.useremail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving incoming activity with user id" + req.params.useremail
                });
            }
        } else res.send(data);
    });
};

exports.getMyActivityExpired = (req, res) => {

    ParkingArea.userActivityExpired(req.params.useremail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found expired activity with user id ${req.params.useremail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving expired activity with user id" + req.params.useremail
                });
            }
        } else res.send(data);
    });

};

exports.getAvailabilityByDate = (req, res) => {

    ParkingArea.checkAvailabilityByDate(req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found availability with date ${req.params.date}.`
                });
            } else {
                res.status(500).send({
                    message: "Error availability with date" + req.params.date
                });
            }
        } else res.send(data);
    });

};


exports.getCarListByUser = (req, res) => {

    ParkingArea.getCarHistoryByUser(req.params.useremail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found history with user id ${req.params.useremail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error history with uaer id" + req.params.useremail
                });
            }
        } else res.send(data);
    });

};