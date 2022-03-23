const db = require("../config/config.js");

class ParkingArea {

    static findAll = (result) => {
        let sql = "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId =  idUserProfile";

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });
    }

    static getBuildingInformation = (result) => {
        let sql = "SELECT biId, biName, biAddress, biPostalCode FROM dbparkr.buildinginfo ORDER BY biName";

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });

    }

    static fetchUserProfiles = (result) => {
        let sql = "SELECT idUserProfile, upUserType, upFirstName, upLastName, upProfileImage, idParkingSlot, upUnitNumber, paFee, paVehicleType, biName, biId FROM dbparkr.userprofile INNER JOIN dbparkr.parkingarea ON idUserProfile = paOwnerId INNER JOIN slotlist ON idParkingSlot = idslot INNER JOIN dbparkr.buildinginfo ON buildingId = biId ORDER BY upLastName, upFirstName"

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });

    }

    static checkAvailability = (userId, dtStart, dtEnd, result) => {
        let sql = "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId = idUserProfile";

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });
    }

    static checkAvailabilityByDate = (availabilityDate, result) => {
        let sql = `SELECT idslot, buildingId, unitid, userid, upFirstName, upLastName, paVehicleType, paStatus, paFee, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_start) as dtstart, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_end) as dtend , IF(ISNULL(idbooking),true,false) as AVAILABLE FROM dbparkr.slotlist left join (SELECT * FROM dbparkr.reservations WHERE DATE_FORMAT(rsvdtstart, "%Y-%M-%d") = DATE_FORMAT("${availabilityDate}", "%Y-%M-%d")) AS RESERVE_TABLE on idslot = rsvparkingslotid INNER JOIN dbparkr.userprofile ON userid = idUserProfile INNER JOIN dbparkr.parkingarea ON paOwnerId = userid WHERE NOT ISNULL(userid) ORDER BY dtstart, idslot`

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });
    }

    static getCarHistoryByUser = (userId, result) => {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}'`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });
    }



    static userActivityInUse = (userId, result) => {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND CAST(CONVERT_TZ( NOW(),'+00:00','-08:00') AS DATETIME) BETWEEN rsvdtstart AND rsvdtend`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });

    }

    static userActivityUpcoming = (userId, result) => {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND rsvdtstart > CONVERT_TZ( NOW(),'+00:00','-08:00')`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });

    }

    static userActivityExpired = (userId, result) => {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND CONVERT_TZ( NOW(),'+00:00','-08:00') > rsvdtend`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(res);
            result(null, res);
        });

    }


}

module.exports = ParkingArea;