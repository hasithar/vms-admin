import axios from "axios";
import { apiConstants } from "@/constants";

const authLogin = async (username, password) => {
  try {
    const response = await axios.post(`${apiConstants.API_URL}/auth/login`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authLogout = () => {
  localStorage.removeItem("user");
};

const authGetCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export { authLogin, authLogout, authGetCurrentUser };

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
