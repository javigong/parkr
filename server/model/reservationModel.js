const sql = require("../config/config.js");

// constructor
const Reservation = function(newReservation) {
    this.rsvparkingslotid = newReservation.rsvparkingslotid;
    this.rsvvisitorid = newReservation.rsvvisitorid;
    this.rsvdtstart = newReservation.rsvdtstart;
    this.rsvdtstart = newReservation.rsvdtstart;
    this.rsvdtend = newReservation.rsvdtend;
    this.rsvstatus = newReservation.rsvstatus;
    this.rsvtype = newReservation.rsvtype;
    this.rsvfee = newReservation.rsvfee;
    this.rsvcarplateno = newReservation.rsvcarplateno;
    this.rsvcarmodel = newReservation.rsvcarmodel;
};

Reservation.saveReservation = (newReservation, result) => {

    sql.query("INSERT INTO dbparkr.reservations SET ?", newReservation, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created reservation: ", { id: res.rsvparkingslotid, ...newReservation });
        result(null, { id: res.rsvparkingslotid, ...newReservation });
    });
};

Reservation.getAll = (result) => {
    let query = "SELECT * FROM dbparkr.reservations";


    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("reservations: ", res);
        result(null, res);
    });
};

module.exports = Reservation;