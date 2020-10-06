import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { SiteContext } from "./SiteContext";
import Styled from "styled-components";
import { TextField, Container, Button, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { green } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";

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
export const AddMember = props => {
  var contextData = useContext(SiteContext);
  const { apiURL } = contextData;
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [alreadyRegisteredMember, setAlreadyRegisteredMember] = useState(false);
  //   componentWillMount()
  // {
  //     // when params sent via url
  //     if (props.location.)
  //     {
  //         let params = props.location;
  //         this.setState({ params });
  //     }
  // }

  useEffect(() => {
    if (!props.location.userName) {
      history.push("/");
    }
  });
  const onAddSubmit = formData => {
    console.log("props", props);
    console.log("formData", formData);
    if (
      formData &&
      formData.newMemberName &&
      formData.dateOfBirth &&
      props.location.userName
    ) {
      console.log('test')
      var formdata = new FormData();
      formdata.append("userId", window.myToken);
      formdata.append("userName", props.location.userName);
      formdata.append("rollNumber", "");
      formdata.append("newMemberName", formData.newMemberName);
      formdata.append("newMemberAge", 25); //need to append date of birth

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };
      const endpoint = `${apiURL}register/dbAddNewMember.php`;
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("result", result);
          setAlreadyRegisteredMember(
            result[0].errorMessege === "Member Already Exists" ? true : false
          );

          if (
            result[0].success === "Y" &&
            result[0].errorMessege === "Member Added Succesfully"
          ) {
            contextData.setIsLoggedIn(true);
            contextData.setExistingUser(result[0]);
            history.push("/");
          }
        });
    }
  };
  return (
    <Styles>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onAddSubmit)}>
          <Box mb={2} mt={2}>
            <Controller
              as={PeaceRadioTextField}
              name="newMemberName"
              label="Add Member Name*"
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
          {alreadyRegisteredMember && (
            <span className="requiredField">Member already Exists</span>
          )}
          <PeaceRadioButton fullWidth type="submit" variant="contained">
            Register
          </PeaceRadioButton>
        </form>
      </Container>
    </Styles>
  );
};

const Styles = Styled.div`
.requiredField{
    font-size: 10px;
    color: red;
    display: block;
}
`;
