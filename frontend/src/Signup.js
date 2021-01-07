import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Signup = ({signupUser}) => {
  const history = useHistory();
const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
}
const [formData, setFormData] = useState(INITIAL_STATE);
const [formErrors, setFormErrors] = useState([]);
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
}
console.debug(
  "SignupForm",
  "signup=", typeof signup,
  "formData=", formData,
  "formErrors=", formErrors,
);

async function handleSubmit(e) {
e.preventDefault();
let result = await signupUser(formData);
console.log(result)
if (result.success) {
  history.push("/companies");
} else {
  setFormErrors(result.errors);
}
setFormData(INITIAL_STATE)

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
</form>
)
}

export default Signup;