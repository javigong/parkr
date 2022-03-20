const db = require("../config/config.js");

class ParkingArea {

    objParkingArea = new function(parkingarea) {
        this.idParkingSlot = parkingarea.ParkingSlotNo;
        this.paUnitNo = parkingarea.UnitNo;
        this.paVehicleType = parkingarea.VehicleType;
        this.paStatus = parkingarea.Status;
        this.paVisitorId = parkingarea.VisitorId;
        this.paFee = parkingarea.Rate;
    };

    objReservation = new function(parkingreservation) {
        this.idbooking = parkingreservation.idbooking;
        this.rsvparkingslotid = parkingreservation.rsvparkingslotid;
        this.rsvvisitorid = parkingreservation.rsvvisitorid;
        this.rsvdtstart = parkingreservation.rsvdtstart;
        this.rsvdtstart = parkingreservation.rsvdtstart;
        this.rsvdtend = parkingreservation.rsvdtend;
        this.rsvtype = parkingreservation.rsvtype;
        this.rsvfee = parkingreservation.rsvfee;
        this.rsvcarplateno = parkingreservation.rsvcarplateno;
        this.rsvcarmodel = parkingreservation.rsvcarmodel;
    };

    saveReservation = (newReservation, result) => {
        sql.query("INSERT INTO dbparkr.reservations SET ?", newReservation, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created reservation: ", { id: res.insertId, ...newReservation });
            result(null, { id: res.insertId, ...newTutorial });
        });
    };


    async save(parkingAreaInfo) {

        let _parkingInfo = new ParkingArea.objParkingArea(parkingAreaInfo);

        let sql = `INSERT INTO parkingarea (idParkingSlot,paUnitNo,paVehicleType,paStatus,paVisitorId,paFee)VALUES(?,?,?,?,?,?)`;

        db.query(sql, [_parkingInfo.idParkingSlot, _parkingInfo.paUnitNo, _parkingInfo.paVehicleType, _parkingInfo.paStatus, _parkingInfo.paVisitorId, _parkingInfo.paFee], (err, results) => {

            if (!err) {
                return _parkingInfo;
            }
        })

        return "error"
    }

    static findAll() {
        let sql = "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId =  idUserProfile";
        return db.execute(sql);
    }

    static getBuildingInformation() {
        let sql = "SELECT biId, biName, biAddress, biPostalCode FROM dbparkr.buildinginfo ORDER BY biName";
        return db.execute(sql);
    }

    static fetchUserProfiles() {
        let sql = "SELECT idUserProfile, upUserType, upFirstName, upLastName, upProfileImage, idParkingSlot, upUnitNumber, paFee, paVehicleType, biName, biId FROM dbparkr.userprofile INNER JOIN dbparkr.parkingarea ON idUserProfile = paOwnerId INNER JOIN slotlist ON idParkingSlot = idslot INNER JOIN dbparkr.buildinginfo ON buildingId = biId ORDER BY upLastName, upFirstName"
        return db.execute(sql);
    }

    static checkAvailability(userId, dtStart, dtEnd) {
        let sql = "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId = idUserProfile";
        return db.execute(sql);
    }

    static checkAvailabilityByDate(availabilityDate) {
        let sql = `SELECT idslot, buildingId, unitid, userid, upFirstName, upLastName, paVehicleType, paStatus, paFee, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_start) as dtstart, CONCAT(DATE_FORMAT("${availabilityDate}", "%Y-%m-%d"), " ",rsrv_end) as dtend , IF(ISNULL(idbooking),true,false) as AVAILABLE FROM dbparkr.slotlist left join (SELECT * FROM dbparkr.reservations WHERE DATE_FORMAT(rsvdtstart, "%Y-%M-%d") = DATE_FORMAT("${availabilityDate}", "%Y-%M-%d")) AS RESERVE_TABLE on idslot = rsvparkingslotid INNER JOIN dbparkr.userprofile ON userid = idUserProfile INNER JOIN dbparkr.parkingarea ON paOwnerId = userid WHERE NOT ISNULL(userid) ORDER BY dtstart, idslot`
        return db.execute(sql);
    }

    static getCarHistoryByUser(userId) {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}'`;
        return db.execute(sql);
    }



    static userActivityInUse(userId) {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND CAST(CONVERT_TZ( NOW(),'+00:00','-08:00') AS DATETIME) BETWEEN rsvdtstart AND rsvdtend`;
        return db.execute(sql);
    }

    static userActivityUpcoming(userId) {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND rsvdtstart > CONVERT_TZ( NOW(),'+00:00','-08:00')`;
        return db.execute(sql);
    }

    static userActivityExpired(userId) {
        let sql = `SELECT idbooking, rsvparkingslotid, rsvvisitorid, userid, rsvdtstart, rsvdtend, rsvstatus, rsvtype, rsvfee, rsvcarplateno, rsvcarmodel FROM dbparkr.reservations INNER JOIN dbparkr.slotlist on rsvparkingslotid = idslot WHERE rsvvisitorid = '${userId}' AND CONVERT_TZ( NOW(),'+00:00','-08:00') > rsvdtend`;
        return db.execute(sql);
    }


}

module.exports = ParkingArea;