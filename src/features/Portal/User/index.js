import UserTable from "./components/UserTable.component";
import UserForm from "./components/UserForm.component";

import {
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "./services/user.service";

import userReducer, {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "./slices/user.slice";

export {
  UserTable,
  getAllParameters,
  getSingleParameter,
  addParameter,
  updateParameter,
  deleteParameter,
  userReducer,
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  UserForm,
};
