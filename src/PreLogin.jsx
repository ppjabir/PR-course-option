import React, { useState, useContext } from "react";
import Styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { SiteContext } from "./SiteContext";
import "react-phone-input-2/lib/material.css";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  TextField,
  Container,
  Box,
  Button,
  Typography
} from "@material-ui/core";

const PeaceRadioButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}))(Button);
const PeaceRadioTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#4AA882"
      },
      "&:hover fieldset": {
        borderColor: "#4AA882"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4AA882"
      }
    }
  }
})(TextField);
export const PreLogin = () => {
  const [loginPhoneWithoutDiailCode, setLoginPhoneWithoutDiailCode] = useState(
    ""
  );
  const [loginPhoneWithDiailCode, setLoginPhoneWithDiailCode] = useState("");

  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  var contextData = useContext(SiteContext);
  const { apiURL } = contextData;

  const navigateToRegister = () => {
    history.push("/userlogin");
  };

  const onLoginSubmit = data => {
    var formdata = new FormData();
    formdata.append("userId", window.myToken);
    formdata.append("mobile", loginPhoneWithoutDiailCode);
    formdata.append("password", "annoor10001");
    formdata.append("internationalNumber", loginPhoneWithDiailCode);
    formdata.append("smsFlag", "N");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    const endpoint = `${apiURL}dbUserLogin.php`;
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result[0].success === "Y" && result[0].errorMessege === "") {
          contextData.setIsLoggedIn(true);
          contextData.setExistingUser(result[0]);
          history.push("/");
        }
      });
  };

  const loginPhoneChange = data => {
    console.log("phone", data);
    setLoginPhoneWithDiailCode(`+${data[0]}`);
    setLoginPhoneWithoutDiailCode(data[0].slice(data[1].dialCode.length));
  };

  return (
    <Styles>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          New Registration
        </Typography>

        <p className="mb-0">
          <strong>Annoor</strong>
        <br/>
        Lorem Ipsum is simply dummy text of the printing</p>
        <p className="mb-0">
          <strong>LiFE</strong>
          <br/>
        Lorem Ipsum is simply dummy text of the printing</p>
        <p className="mb-0">
          <strong>E Madrasa</strong>
          <br/>
        Lorem Ipsum is simply dummy text of the printing </p>
        <Box mb={5}>
          {/* <input
            type="button"
            onClick={() => navigateToRegister()}
            value="Register Me"
          /> */}
          <PeaceRadioButton
            fullWidth
            type="button"
            variant="contained"
            onClick={() => navigateToRegister()}
          >
            Register Me
          </PeaceRadioButton>
        </Box>
        <Box mb={3}>Already Registered Candidates</Box>

        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <Box mb={2}>
            <Controller
              as={PhoneInput}
              label="Phone Number"
              name="PhoneInput"
              control={control}
              country={"in"}
              defaultValue=""
              enableSearch={true}
              margin="normal"
              fullWidth
              onChange={phone => loginPhoneChange(phone)}
            />
          </Box>
          <Box mb={2}>
            <Controller
              as={PeaceRadioTextField}
              name="password"
              label="password"
              variant="outlined"
              control={control}
              InputLabelProps={{
                shrink: true,
                style: { color: "#4AA882" }
              }}
              fullWidth
              ref={register({ required: true })}
            />
            {errors.password && (
              <span className="requiredField">Password field is required</span>
            )}
          </Box>

          <PeaceRadioButton fullWidth type="submit" variant="contained">
            Login
          </PeaceRadioButton>
        </form>
      </Container>
    </Styles>
  );
};

const Styles = Styled.div`
    .react-tel-input .form-control {
        width: 100%;
        border: 1px solid #4AA882;
        &:focus {
            box-shadow: 0 0 0 1px #4AA882;
        }
        &+div:before {
            content: 'Mobile Number';
            color: #4AA882
        }
    }
    .react-tel-input .flag-dropdown {
        border: 1px solid #4AA882
    }
    input[type='submit'],
    input[type='button'] {
        background-color: #4aa882;
        width: 100%;
        outline: 0 none;
        border: 0 none;
        color: #fff;
        font-weight: bold;
        line-height: 40px;
        border-radius: 10px;
    }
    .requiredField{
        font-size: 10px;
        color: red;
        display: block;
    }
`;
