import React, { useState, useContext } from "react";
import Styled from "styled-components";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { SiteContext } from "./SiteContext";
import "react-phone-input-2/lib/material.css";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {
  TextField,
  Container,
  Button,
  Box,
  Typography,
  Fab
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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

const PeaceRadioDatePicker = withStyles({
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
})(KeyboardDatePicker);

const PeaceRadioButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}))(Button);

export const UserRegister = () => {
  var contextData = useContext(SiteContext);
  const { apiURL } = contextData;
  const history = useHistory();
  const [
    registerPhoneWithoutDiailCode,
    setRegisterPhoneWithoutDiailCode
  ] = useState("");
  const [registerPhoneWithDiailCode, setRegisterPhoneWithDiailCode] = useState(
    ""
  );
  //const [selectedDate, setSelectedDate] = useState(new Date());
  //const [birthDate, setBirthDate]= useState()
  //const [phoneError, setPhoneError] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const { register, handleSubmit, control, errors } = useForm(); // initialise the hook

  // useEffect(()=>{
  //    set
  // })

  // const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };

  const onRegisterSubmit = formData => {
    //setPhoneError(registerPhoneWithDiailCode.length === 0)
    console.log("formData", formData);
    if (
      formData &&
      formData.firstName &&
      registerPhoneWithoutDiailCode &&
      registerPhoneWithDiailCode
    ) {
      var formdata = new FormData();
      formdata.append("userId", window.myToken);
      formdata.append("mobile", registerPhoneWithoutDiailCode);
      formdata.append("candiName", formData.firstName);
      formdata.append("internationalNumber", registerPhoneWithDiailCode);
      formdata.append("smsFlag", "N");

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };
      const endpoint = `${apiURL}register/dbRegisterCandidate.php`;
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          //setRegisterData(result[0])
          setAlreadyRegistered(
            result[0].errorMessege === "Mobile Number Already Registered"
              ? true
              : false
          );
          if (
            result[0].success === "Y" &&
            result[0].errorMessege === "Registration success"
          ) {
            contextData.setIsLoggedIn(true);
            contextData.setExistingUser(result[0]);
            history.push("/");
          }
          console.log("registered", result[0]);
        });
    }
  };

  const handleInputChange = phone => {
    setRegisterPhoneWithDiailCode(phone[3].replace(/[-\s]/g, ""));
    setRegisterPhoneWithoutDiailCode(phone[0].slice(phone[1].dialCode.length));
  };
  return (
    <Styles>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          Registration Details
        </Typography>
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <Box mb={2} mt={2}>
            <Controller
              as={PeaceRadioTextField}
              name="firstName"
              label="Name*"
              variant="outlined"
              control={control}
              InputLabelProps={{
                shrink: true,
                style: { color: "#4AA882" }
              }}
              fullWidth
              ref={register({ required: true })}
            />
          </Box>
          {/* {errors.firstName && <span className="requiredField">Name field is required</span>} */}
          <Box mb={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                as={
                  <PeaceRadioDatePicker
                    fullWidth
                    autoOk
                    inputVariant="outlined"
                    variant="inline"
                    format="MM/dd/yyyy"
                    label="Date of birth*"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#4AA882" }
                    }}
                  />
                }
                control={control}
                name="dateOfBirth"
              />
            </MuiPickersUtilsProvider>
            {/* {errors.ReactDatePicker && <span>Date of Birth field is required</span>} */}
          </Box>
          <Box mb={2}>
            <Controller
              as={<PhoneInput id="pNum" placeholder="Enter phone number" />}
              country={"in"}
              name="phoneNumber"
              control={control}
              onChange={handleInputChange}
              enableSearch={true}
              ref={register({ required: true })}
              margin="normal"
            />
            {/* {errors.phoneNumber && <span className="requiredField">Mobile Number field is required</span>} */}
          </Box>
          <Box mb={2}>
            <Controller
              as={PeaceRadioTextField}
              name="email"
              label="Email ID"
              variant="outlined"
              control={control}
              InputLabelProps={{
                shrink: true,
                style: { color: "#4AA882" }
              }}
              fullWidth
              ref={register({
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
            />
          </Box>
          <span className="requiredField">
            {errors.email && errors.email.message}
          </span>
          {/* <label for="address" className="pt-3 mb-0">Address<sup>*</sup></label> */}
          {/* <textarea name="address" ref={register({ required: true })} /> */}
          <Box mb={2}>
            <Controller
              as={PeaceRadioTextField}
              name="address"
              label="Address"
              variant="outlined"
              control={control}
              InputLabelProps={{
                shrink: true,
                style: { color: "#4AA882" }
              }}
              fullWidth
              ref={register({ required: true })}
              rows={4}
              multiline
            />

            {errors.address && (
              <span className="requiredField">Address field is required</span>
            )}
          </Box>
          <Box mb={2} mt={2}>
            <Controller
              as={PeaceRadioTextField}
              name="qualification"
              label="Highest Qualification"
              variant="outlined"
              control={control}
              InputLabelProps={{
                shrink: true,
                style: { color: "#4AA882" }
              }}
              ref={register}
              fullWidth
            />
          </Box>
          <Box mb={2} mt={2}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                ref={register}
              />
              <Fab
                color="#4AA882"
                size="small"
                component="div"
                aria-label="add"
                variant="extended"
              >
                <AddIcon /> Upload photo
              </Fab>
            </label>
          </Box>
          {alreadyRegistered && (
            <span className="requiredField">
              Mobile number already registered
            </span>
          )}

          {/* <input type="submit" value="Register" className="mt-4" /> */}
          <PeaceRadioButton fullWidth type="submit" variant="contained">
            Register
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
        color: #4AA882;
        left: 8px;
    }
}
.react-tel-input .flag-dropdown {
    border: 1px solid #4AA882
}
    // input[name='password'],
    // input[name='firstName'],
    // input[name='ReactDatepicker'],
    // input[name='email'],
    // textarea  {
    //     width: 100%;
    //     border: 1px solid #cacaca;
    //     border-radius: 5px;
    //     line-height: 22px;
    //     padding: 6px;
    // }
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
    .react-datepicker-wrapper {
        width: 100%;
    }
    .requiredField{
        font-size: 10px;
        color: red;
        display: block;
    }
    label {
        display: block;
    }
`;
