import "./signup.css";
import { useState } from "react";
import { inputs } from "../../constants";
import { signupAsync } from "../../redux";
import FormInput from "../formInput/FormInput";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ user }) => user.error);

  const [values, setValues] = useState({
    username: "",
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...userDetails } = values;
    dispatch(signupAsync(userDetails));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dynamicInputs = inputs.map((input) => {
    if (input.name === "confirmPassword") {
      return {
        ...input,
        pattern: values.password,
      };
    }
    return input;
  });

  return (
    <div className="signup flex">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          {dynamicInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>REGISTER</button>
        </form>

        <p className="error">{error ? error : ""}</p>
      </div>
    </div>
  );
};

export default Signup;
