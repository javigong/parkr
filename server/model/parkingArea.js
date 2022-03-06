const db = require('../config/config.js')

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
        let sql = "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON userid = paOwnerId INNER JOIN dbparkr.userprofile ON userid = idUserProfile";
        return db.execute(sql);
    }

    static checkAvailability(userId, dtStart, dtEnd) {
        let sql = "SELECT idParkingSlot, paUnitNo, paOwnerId, upFirstName, upLastName, paVehicleType, paStatus, paVisitorId, paFee, rsrv_start, rsrv_end, IF(paVisitorID<>null, 0, 1) as availability FROM dbparkr.parkingarea INNER JOIN dbparkr.slotlist ON userid = paOwnerId INNER JOIN dbparkr.userprofile ON userid = idUserProfile";
        return db.execute(sql);
    }
}

module.exports = ParkingArea;