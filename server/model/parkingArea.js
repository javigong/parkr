const db = require("../config/config.js");

class ParkingArea {

    // constructor
    ParkingInfo = function(newParkingInfo) {
        this.idParkingSlot = newParkingInfo.idParkingSlot;
        this.paUnitNo = newParkingInfo.paUnitNo;
        this.paOwnerId = newParkingInfo.paOwnerId;
        this.paVehicleType = newParkingInfo.paVehicleType;
        this.paStatus = newParkingInfo.paStatus;
        this.paVisitorId = newParkingInfo.paVisitorId;
        this.paFee = newParkingInfo.paFee;
    };

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

    static hostParkingSlots = (host, result) => {
        let sql = `SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId =  idUserProfile WHERE paOwnerId ="${host}"`;

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
        let sql = `SELECT idslot, buildingId, unitid, userid, upFirstName, upLastName, paVehicleType, paStatus, paFee, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_start) as dtstart, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_end) as dtend , IF(ISNULL(idbooking),true,false) as AVAILABLE, IFNULL(rsvstatus,0) as reservation_status FROM dbparkr.slotlist left join (SELECT * FROM dbparkr.reservations WHERE DATE_FORMAT(rsvdtstart, "%Y-%M-%d") = DATE_FORMAT("${availabilityDate}", "%Y-%M-%d")) AS RESERVE_TABLE on idslot = rsvparkingslotid INNER JOIN dbparkr.userprofile ON userid = idUserProfile INNER JOIN dbparkr.parkingarea ON paOwnerId = userid WHERE NOT ISNULL(userid) AND IFNULL(rsvstatus,0) > 0 ORDER BY dtstart, idslot`

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

    static checkAvailabilityByDateWeekly = (availabilityDate, result) => {
        let sql = `SELECT idslot, buildingId, unitid, userid, upFirstName, upLastName, paVehicleType, paStatus, paFee, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_start) as dtstart, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_end) as dtend , IF(ISNULL(idbooking),true,false) as AVAILABLE, IFNULL(rsvstatus,0) as reservation_status FROM dbparkr.slotlist left join (SELECT * FROM dbparkr.reservations WHERE DATE_FORMAT(rsvdtstart, "%Y-%M-%d") BETWEEN DATE_FORMAT("${availabilityDate}", "%Y-%M-%d") AND DATE_ADD(STR_TO_DATE("${availabilityDate}", "%Y-%m-%d"), INTERVAL 7 DAY)) AS RESERVE_TABLE on idslot = rsvparkingslotid INNER JOIN dbparkr.userprofile ON userid = idUserProfile INNER JOIN dbparkr.parkingarea ON paOwnerId = userid WHERE NOT ISNULL(userid) AND IFNULL(rsvstatus,0) > 0 ORDER BY dtstart, idslot`

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

    static checkAvailabilityByDateMonthly = (availabilityDate, result) => {
        let sql = `SELECT idslot, buildingId, unitid, userid, upFirstName, upLastName, paVehicleType, paStatus, paFee, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_start) as dtstart, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_end) as dtend , IF(ISNULL(idbooking),true,false) as AVAILABLE, IFNULL(rsvstatus,0) as reservation_status FROM dbparkr.slotlist left join (SELECT * FROM dbparkr.reservations WHERE DATE_FORMAT(rsvdtstart, "%Y-%M-%d") BETWEEN DATE_FORMAT("${availabilityDate}", "%Y-%M-%d") AND DATE_ADD(STR_TO_DATE("${availabilityDate}", "%Y-%m-%d"), INTERVAL 30 DAY)) AS RESERVE_TABLE on idslot = rsvparkingslotid INNER JOIN dbparkr.userprofile ON userid = idUserProfile INNER JOIN dbparkr.parkingarea ON paOwnerId = userid WHERE NOT ISNULL(userid) And IFNULL(rsvstatus,0) > 0 ORDER BY dtstart, idslot`

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
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvstatus > 0 AND rsvvisitorid = '${userId}' AND CAST(CONVERT_TZ( NOW(),'+00:00','-08:00') AS DATETIME) BETWEEN rsvdtstart AND rsvdtend`;

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



    static hostActivityCurrentIncoming = (userId, result) => {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE userid = '${userId}' AND (rsvdtstart > CONVERT_TZ( NOW(),'+00:00','-08:00') OR CAST(CONVERT_TZ( NOW(),'+00:00','-08:00') AS DATETIME) BETWEEN rsvdtstart AND rsvdtend)`;

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

    static hostActivityExpired = (userId, result) => {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE userid = '${userId}' AND (CONVERT_TZ( NOW(),'+00:00','-08:00') > rsvdtend OR rsvstatus = 0)`;

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
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvstatus > 0 AND rsvvisitorid = '${userId}' AND rsvdtstart > CONVERT_TZ( NOW(),'+00:00','-08:00')`;

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
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND (CONVERT_TZ( NOW(),'+00:00','-08:00') > rsvdtend OR rsvstatus = 0)`;

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

    static saveParkingSlot = (newParkingInfo, result) => {
        db.query(`SELECT idParkingSlot, paUnitNo, paOwnerId, paVehicleType, paStatus, paVisitorId, paFee FROM dbparkr.parkingarea WHERE idParkingSlot = "?"`, [newParkingInfo.idParkingSlot], (err, res) => {
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

        db.query(`INSERT INTO dbparkr.parkingarea SET ?`, newParkingInfo, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("parking slot registered: ", { id: res.idParkingSlot, ...newParkingInfo });
            result(null, { id: res.idParkingSlot, ...newParkingInfo });
        });
    };

}

module.exports = ParkingArea;