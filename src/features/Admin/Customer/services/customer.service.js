import axios from "axios";
import { apiConstants } from "@/constants";
import { authHeader } from "@/utils";

const fetchAll = async () => {
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

const deleteSingle = async (id) => {
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

export { fetchAll, deleteSingle };

// import { apiConstants } from "../constants";
// import { authHeader } from "../helpers";

// export const organizationService = {
//   getSingleParameter,
//   getAllParameters,
//   addParameter,
//   updateParameter,
//   deleteParameter,
//   clear,
// };

// // get single parameter
// function getSingleParameter(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(
//     `${apiConstants.API_URL}/organizations/${id}`,
//     requestOptions
//   ).then(handleResponse);
// }

// // get all parameter
// function getAllParameters() {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(`${apiConstants.API_URL}/organizations`, requestOptions).then(
//     handleResponse
//   );
// }

// // add parameter
// function addParameter(
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
//     method: "POST",
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
//       gst_enabled: gst_enabled,
//     }),
//   };

//   return fetch(`${apiConstants.API_URL}/organizations`, requestOptions).then(
//     handleResponse
//   );
// }

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

// // clear parameter
// function clear() {}

// // handle response
// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);

//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         // logout()
//         // window.location.reload(true);
//       }

//       const error = (data && data.error) || response.statusText;
//       let errorMessage = "";
//       if (data?.code === 500) {
//         errorMessage = (data && data.message) || response.statusText;
//       } else {
//         errorMessage = Object.values(error).map((errorKey) => {
//           return errorKey[0];
//         });
//       }
//       return Promise.reject(errorMessage);
//     }

//     return data;
//   });
// }

//         user.alias = username;
//         console.log("🚀 ~ file: user.service.js:37 ~ .then ~ user", user);
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("profileDetails", JSON.stringify(user?.data));
//         localStorage.setItem("app_permission", JSON.stringify(user?.data?.roles[0]?.permissions));

// // get single parameter
// function getSingle(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(`${apiConstants.API_URL}/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }
