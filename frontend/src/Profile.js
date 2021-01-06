import React, {useState, useContext} from "react";
import JoblyApi from './api'
import UserContext from "./UserContext";

import { useHistory } from "react-router-dom";


function Profile() {

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
const [formErrors, setFormErrors] = useState([]);
const [saveConfirmed, setSaveConfirmed] = useState(false);

console.debug(
  "ProfileForm",
  "currentUser=", currentUser,
  "formData=", formData,
  "formErrors=", formErrors,
  "saveConfirmed=", saveConfirmed,
);

async function handleSubmit(evt) {
  evt.preventDefault();

  let profileData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
  };

  let username = formData.username;
  let updatedUser;

  try {
    updatedUser = await JoblyApi.saveProfile(username, profileData);
  } catch (errors) {
    debugger;
    setFormErrors(errors);
    return;
  }

  setFormData(f => ({ ...f, password: "" }));
  setFormErrors([]);
  setSaveConfirmed(true);

  // trigger reloading of user information throughout the site
  setCurrentUser(updatedUser);
}

function handleChange(evt) {
  const { name, value } = evt.target;
  setFormData(f => ({
    ...f,
    [name]: value,
  }));
  setFormErrors([]);
}
return (
  <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Username</label>
    <input
        name="username"
        className="form-control"
        value={formData.username}
        onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label>Password</label>
    <input
        type="password"
        name="password"
        className="form-control"
        value={formData.password}
        onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>First name</label>
    <input
        name="firstName"
        className="form-control"
        value={formData.firstName}
        onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label>Last name</label>
    <input
        name="lastName"
        className="form-control"
        value={formData.lastName}
        onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label>Email</label>
    <input
        type="email"
        name="email"
        className="form-control"
        value={formData.email}
        onChange={handleChange}
    />
  </div>

  <button
      type="submit"
      className="btn btn-primary float-right"
      onSubmit={handleSubmit}
  >
    Submit
  </button>
</form> )
}

export default Profile;