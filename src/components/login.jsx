import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Paper,
} from "@mui/material";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/login-action";
import { connect } from "react-redux";
const ariaLabel = { "aria-label": "description" };

const Login = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errMsg, setErrMsg] = useState("");

  // Step1 : Define schema object
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().required(),
  };

  // Step2: Validate schema with user input
  const validate = () => {
    const errors = {};
    const result = Joi.validate(user, schema, { abortEarly: false });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[username] = "username is required";
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Capture user input and update state object
  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...user };
    usr[event.target.name] = event.target.value;
    //this.setState({ user: user });
    setUser(usr);
  };

  const handleSubmit = (event) => {
    // Prevent default behaviour of submit button
    event.preventDefault();
    console.log("Handle submit");

    // Validate user input againest schema
    setErrors(validate());
    console.log(errors);

    // if errors, don't redirect to products page
    if (errors) return;

    // Dispatch login action
    dispatch(loginAction(user));

    // Redirect to products page on successfull login
    if (login.loggedIn) {
      props.history.push("/home");
    }
  };
  return (
    <div>
      <figure class="text-center">
        <blockquote class="blockquote">
          <h3>
            <i> Login</i>
          </h3>
        </blockquote>
      </figure>
      <Grid container>
        <Grid item xs={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              border: "3px solid black",
              padding: "20px",
              marginTop: "10px",
            }}
          >
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="text"
                variant="outlined"
                fullWidth
                label="Username"
                value={user.username}
                name="username"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.username}</Typography>
              )}
            </Box>
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="password"
                fullWidth
                variant="outlined"
                label="Password"
                value={user.password}
                name="password"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.password}</Typography>
              )}
            </Box>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleChange}
                name="role"
                value={user.role}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>
            {errors && <Typography variant="caption">{errors.role}</Typography>}
            <Box mt={3}>
              <Button
                variant="contained"
                type="submit"
                color="success"
                size="small"
              >
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  //  const { fakestore } = state;
  return {
    login: state.login.login,
  };
};

// function to dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    loginAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Login);
