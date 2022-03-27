import axios from "axios";
import { BASE_URL } from "../config/api_config";

export const getAllParkingSpots = async (token) => {
  const configurationObject = {
    method: "get",
    url: `${BASE_URL}/parkingslot/allslots`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(configurationObject);
    // console.log("get allslots", response.data);
    const results = response.data;
    return results;
  } catch (error) {
    throw error;
  }
};

export const postNewParkingSpot = async (
  idParkingSlot,
  paUnitNo,
  paVehicleType,
  paStatus,
  paVisitorId,
  paFee
) => {
  const configurationObject = {
    method: "post",
    url: `${BASE_URL}/parkingslot/saveparkingarea/${idParkingSlot}`,
    data: {
      idParkingSlot: idParkingSlot,
      paUnitNo: paUnitNo,
      paVehicleType: paVehicleType,
      paStatus: paStatus,
      paVisitorId: paVisitorId,
      paFee: paFee,
    },
  };
  try {
    const response = await axios(configurationObject);
    // console.log("post saveparkingarea/idParkingSlot", response.data);
    const results = response.data;
    return results;
  } catch (error) {
    throw error;
  }
};

export const getBuildingInfo = async (token) => {
  const configurationObject = {
    method: "get",
    url: `${BASE_URL}/parkingslot/buildinginfo`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(configurationObject);

    // console.log("building info:", response.data);

    const results = response.data;

    return results;
  } catch (error) {
    throw error;
  }
};

export const getCarListByUser = async (email, token) => {
  const configurationObject = {
    method: "get",
    url: `${BASE_URL}/parkingslot/carlist/${email}`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(configurationObject);

    // console.log("get carlist:", response.data);

    const results = response.data;

    return results;
  } catch (error) {
    throw error;
  }
};

export const postReservation = async (
  rsvparkingslotid,
  rsvvisitorid,
  rsvdtstart,
  rsvdtend,
  rsvstatus,
  rsvtype,
  rsvfee,
  rsvcarplateno,
  rsvcarmodel,
  token
) => {
  const configurationObject = {
    method: "put",
    url: `${BASE_URL}/reservation/savereservation`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      rsvparkingslotid: rsvparkingslotid,
      rsvvisitorid: rsvvisitorid,
      rsvdtstart: rsvdtstart,
      rsvdtend: rsvdtend,
      rsvstatus: rsvstatus,
      rsvtype: rsvtype,
      rsvfee: rsvfee,
      rsvcarplateno: rsvcarplateno,
      rsvcarmodel: rsvcarmodel,
    },
  };
  try {
    const response = await axios(configurationObject);
    const results = response.data;
    return results;
  } catch (error) {
    throw error;
  }
};
