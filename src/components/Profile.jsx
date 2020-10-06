import React from "react";
import { QustionPaper } from "./QustionPaper";

import {
  Typography,
  Container,
  makeStyles,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 5, 5),
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  inline: {
    display: "inline"
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "8vw",
    marginBottom: "16px",
    maxWidth: "500px"
  },
  textp: {
    fontSize: "4vw"
  },
  buttonStyle: {
    margin: theme.spacing(3, 2),
    textTransform: "none"
  },
  root2: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

export const Profile = props => {
  console.log("propsprofile", props);

  const { data } = props;
  const classes = useStyles();
  return (
    <Container maxWidth className={classes.root2}>
      <Container maxWidth m={2} className={classes.root}>
        {data && data.name && (
          <Typography className={classes.text} variant="h4">
            {props.data.name}
          </Typography>
        )}

        {data && data.rollNumber && (
          <Typography className={classes.textp} variant="body1">
            Roll Number: {props.data.rollNumber}
          </Typography>
        )}
        {props.data &&
          props.data.todaysQuestionData &&
          props.data.todaysQuestionData.todayQuestionsList.length > 0 && (
            <QustionPaper
              data={props.data.todaysQuestionData.todayQuestionsList}
            />
          )}
        {/* <Button className={classes.buttonStyle} variant="contained" color="secondary" disableElevation>View my Courses</Button> */}
      </Container>
      <Divider />
    </Container>
  );
};

//export default Profile;
