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
        let sql =
            "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId =  idUserProfile";
        return db.execute(sql);
    }

    static getBuildingInformation() {
        let sql = "SELECT biId, biName, biAddress, biPostalCode FROM dbparkr.buildinginfo ORDER BY biName";
        return db.execute(sql);
    }

    static fetchUserProfiles() {
        let sql = "SELECT idUserProfile, upUserType, upFirstName, upLastName, upProfileImage, idParkingSlot, upUnitNumber, paFee, paVehicleType FROM dbparkr.userprofile INNER JOIN dbparkr.parkingarea ON idUserProfile = paOwnerId ORDER BY upLastName, upFirstName";
        return db.execute(sql);
    }

    static checkAvailability(userId, dtStart, dtEnd) {
        let sql =
            "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON paOwnerId = userid INNER JOIN dbparkr.userprofile ON paOwnerId = idUserProfile";
        return db.execute(sql);
    }
}

module.exports = ParkingArea;