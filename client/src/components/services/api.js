import axios from "axios";
import { BASE_URL } from "../config/api_config";

export const getAllParkingSlots = async () => {
  const configurationObject = {
    method: "get",
    url: `${BASE_URL}/parkingslot/allslots`,
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

export const postNewParkingSlot = async (
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
