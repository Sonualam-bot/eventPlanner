import "./signin.css";
import React, { useState } from "react";
import { signInInputs } from "../../constants";
import FormInput from "../formInput/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { signinAsync } from "../../redux";

const Signin = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ user }) => user.error);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinAsync(values));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="signin flex">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>SignIn</h2>
          {signInInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>SIGN IN</button>
        </form>

        <p className="error">{error ? error : ""}</p>
      </div>
    </div>
  );
};

export default Signin;
