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
    // console.log(response.data.parkingSlots);
    const results = response.data.parkingSlots;
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
      paVehicleTyp: paVehicleType,
      paStatus: paStatus,
      paVisitorId: paVisitorId,
      paFee: paFee,
    },
  };
  try {
    const response = await axios(configurationObject);
    // console.log(response.data.results);
    const results = response.data.results;
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

    // console.log(response.data);

    const results = response.data.buildingInfo;

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

    console.log(response.data);

    const results = response.data.userProfiles;

    return results;
  } catch (error) {
    throw error;
  }
};
