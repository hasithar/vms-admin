export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

// Note: For Node.js Express back-end, please use x-access-token header like this:

// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.accessToken) {
//     // for Node.js Express back-end
//     return { 'x-access-token': user.accessToken };
//   } else {
//     return {};
//   }
// }

// export function authHeader() {
//   // return authorization header with jwt token
//   let user = JSON.parse(localStorage.getItem("user"));

//   // if (user && user?.data?.token) {
//   if (user && user?.token) {
//     return {
//       // Authorization: "Bearer " + user?.data?.token,
//       Authorization: "Bearer " + user?.token,
//       "Content-Type": "application/json",
//     };
//   } else {
//     return {};
//   }
// }

// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.accessToken) {
//     return { Authorization: 'Bearer ' + user.accessToken };
//   } else {
//     return {};
//   }
// }
