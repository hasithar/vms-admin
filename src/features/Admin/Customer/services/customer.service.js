import axios from "axios";
import { apiConstants } from "@/constants";
import { authHeader } from "@/utils";

const getAllParameters = async () => {
  const requestOptions = {
    headers: authHeader(),
  };

  try {
    const response = await axios.get(
      `${apiConstants.API_URL}/customers`,
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
      `${apiConstants.API_URL}/customers/${id}`,
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
      `${apiConstants.API_URL}/customers`,
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
      `${apiConstants.API_URL}/customers/${id}`,
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
      `${apiConstants.API_URL}/customers/${id}`,
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

// // update parameter
// function updateParameter(
//   id,
//   name,
//   email,
//   contact_no,
//   contact_person_name,
//   sales_rep_id,
//   address_line_1,
//   address_line_2,
//   city,
//   state,
//   postal_code,
//   use_same_billing_address,
//   purchase_order_required,
//   country_id,
//   payment_term_id,
//   status,
//   delivery_name,
//   delivery_email,
//   delivery_contact_no,
//   delivery_contact_person_name,
//   delivery_address_line_1,
//   delivery_address_line_2,
//   delivery_postal_code,
//   delivery_city,
//   delivery_state,
//   delivery_country_id,
//   gst_enabled
// ) {
//   const requestOptions = {
//     method: "PUT",
//     headers: authHeader(),
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       contact_no: contact_no,
//       contact_person_name: contact_person_name,
//       sales_rep_id: sales_rep_id,
//       address_line_1: address_line_1,
//       address_line_2: address_line_2,
//       city: city,
//       state: state,
//       postal_code: postal_code,
//       use_same_billing_address: use_same_billing_address,
//       purchase_order_required: purchase_order_required,
//       country_id: country_id,
//       payment_term_id: payment_term_id,
//       status: status,
//       delivery_name: delivery_name,
//       delivery_email: delivery_email,
//       delivery_contact_no: delivery_contact_no,
//       delivery_contact_person_name: delivery_contact_person_name,
//       delivery_address_line_1: delivery_address_line_1,
//       delivery_address_line_2: delivery_address_line_2,
//       delivery_postal_code: delivery_postal_code,
//       delivery_city: delivery_city,
//       delivery_state: delivery_state,
//       delivery_country_id: delivery_country_id,
//       gst_enabled,
//     }),
//   };

//   return fetch(
//     `${apiConstants.API_URL}/organizations/${id}`,
//     requestOptions
//   ).then(handleResponse);
// }
