const db = require("../config/config.js");

class ParkingArea {
    constructor(objParkingArea) {
        this.objParkingArea.idParkingSlot = objParkingArea.ParkingSlotNo;
        this.objParkingArea.paUnitNo = objParkingArea.UnitNo;
        this.objParkingArea.paVehicleType = objParkingArea.VehicleType;
        this.objParkingArea.paStatus = objParkingArea.Status;
        this.objParkingArea.paVisitorId = objParkingArea.VisitorId;
        this.objParkingArea.paFee = objParkingArea.Rate;
    }

    async save() {
        let sql = `INSERT INTO parkingarea (idParkingSlot,paUnitNo,paVehicleType,paStatus,paVisitorId,paFee)VALUES
        ('${this.objParkingArea.idParkingSlot}','${this.objParkingArea.paUnitNo}','${this.objParkingArea.paVehicleType}',
        '${this.objParkingArea.paStatus}','${this.objParkingArea.paVisitorId}','${this.objParkingArea.paFee}')`;

        const [newParkingArea, _] = await db.execute(sql);

        return newParkingArea;
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