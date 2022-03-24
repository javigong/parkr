const sql = require("../config/config.js");

const formatedTimestamp = (datetime) => {
    const d = new Date(datetime);
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
}

// constructor
const Reservation = function(newReservation) {
    this.rsvparkingslotid = newReservation.rsvparkingslotid;
    this.rsvvisitorid = newReservation.rsvvisitorid;
    this.rsvdtstart = newReservation.rsvdtstart;
    this.rsvdtstart = formatedTimestamp(newReservation.rsvdtstart);
    this.rsvdtend = formatedTimestamp(newReservation.rsvdtend);
    this.rsvstatus = newReservation.rsvstatus;
    this.rsvtype = newReservation.rsvtype;
    this.rsvfee = newReservation.rsvfee;
    this.rsvcarplateno = newReservation.rsvcarplateno;
    this.rsvcarmodel = newReservation.rsvcarmodel;
};

Reservation.saveReservation = (newReservation, result) => {


    sql.query(`SELECT rsvvisitorid, rsvdtstart FROM dbparkr.reservations WHERE rsvvisitorid= ? AND rsvdtstart =  ?`, [newReservation.rsvvisitorid, newReservation.rsvdtstart], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res && res[0]) {
            console.log('data exists:', res);
            throw new Error('data already exists')
        }
    });


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