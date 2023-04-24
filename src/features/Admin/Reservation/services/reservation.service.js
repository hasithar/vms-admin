import axios from "axios";
import { apiConstants } from "@/constants";
import { authHeader } from "@/utils";

const getAllParameters = async () => {
  const requestOptions = {
    headers: authHeader(),
  };

  try {
    const response = await axios.get(
      `${apiConstants.API_URL}/reservations`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSingleParameter = async (id) => {
  const requestOptions = {
    headers: authHeader(),
  };

  try {
    const response = await axios.get(
      `${apiConstants.API_URL}/reservations/${id}`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addParameter = async (data) => {
  const requestOptions = {
    headers: authHeader(),
  };

  try {
    const response = await axios.post(
      `${apiConstants.API_URL}/reservations`,
      data,
      requestOptions
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateParameter = async (id, data) => {
  const requestOptions = {
    headers: authHeader(),
  };

  try {
    const response = await axios.put(
      `${apiConstants.API_URL}/reservations/${id}`,
      data,
      requestOptions
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteParameter = async (id) => {
  const requestOptions = {
    headers: authHeader(),
  };

  try {
    const response = await axios.delete(
      `${apiConstants.API_URL}/reservations/${id}`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
};
