import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
const Login = ({login}) => {
  const history = useHistory();
const INITIAL_STATE = {
    username: '',
    password: ''
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
  "Login",
  "login=", typeof login,
  "formData=", formData,
  "formErrors=", formErrors,
);

async function handleSubmit(e) {
e.preventDefault();
let result = await login(formData);
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

export default Login;