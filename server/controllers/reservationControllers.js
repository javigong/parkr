const Reservation = require("../model/reservationModel.js");
const db = require("../config/config.js");

// Create and Save a new reservation
exports.createReservation = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a reservation
    const reservation = new Reservation({
        rsvparkingslotid: req.body.rsvparkingslotid,
        rsvvisitorid: req.body.rsvvisitorid,
        rsvdtstart: req.body.rsvdtstart,
        rsvdtstart: req.body.rsvdtstart,
        rsvdtend: req.body.rsvdtend,
        rsvstatus: req.body.rsvstatus,
        rsvtype: req.body.rsvtype,
        rsvfee: req.body.rsvfee,
        rsvcarplateno: req.body.rsvcarplateno,
        rsvcarmodel: req.body.rsvcarmodel
    });

    // Save Reservation in the database
    Reservation.saveReservation(reservation, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the reservation."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {

    Reservation.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving reservations."
            });
        else res.send(data);
    });
};