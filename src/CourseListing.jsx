import React, { useContext, useState, useEffect } from "react";
import { SiteContext } from "./SiteContext";
import SchoolIcon from "@material-ui/icons/School";
import { useHistory } from "react-router-dom";
import {
    makeStyles,
  FormControl,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    zIndex: 0
  },
  box: {},
  inline: {
    display: "inline"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));
export const CourseListing = props => {
  console.log("propssss", props.location.memberData);
  const history = useHistory();
  var contextData = useContext(SiteContext);
  console.log("contextData", contextData);
  const { existingUser } = contextData;
  console.log("existingUser", existingUser);

  const [candidateRollNumber, setCandidateRollNumber] = useState(
    props.location.memberRollNumber
  );
  const [candidateData, setCandidateData] = useState(null);

  useEffect(() => {
    if (existingUser) {
        console.log("existingUseruseEffect", existingUser);
      existingUser.memberList.forEach(item => {
        if (item.rollNumber === props.location.memberRollNumber) {
          setCandidateData(item);
        }
      });
    }
  }, [existingUser]);

  useEffect(() => {
    console.log("existingUseruseEffect", existingUser);
    if (existingUser === null) {
        history.push("/");
    }
  },[])

  const handleChange = event => {
    setCandidateRollNumber(event.target.value);
    existingUser.memberList.forEach(item => {
      if (item.rollNumber === event.target.value) {
        setCandidateData(item);
      }
    });
  };

  const navigateToCourseHome = (courseName) => {
    history.push({
        pathname: "/courseHome",
        courseName,
        selectedRollNumber:candidateRollNumber 
      });
  }

  const classes = useStyles();
  if(candidateData){
  console.log('candidte',candidateData.rollNumber)
  }

  return (
    <>
    
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          id="demo-simple-select-outlined-label"
          shrink
          notched={true}
        >
          Select Candidate
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={candidateRollNumber}
          onChange={handleChange}
          label="Select Candidate"
        >
          {existingUser && (existingUser.memberList.map((item, key) => (
            <MenuItem value={item.rollNumber}>{item.name}</MenuItem>
          )))}
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      {candidateData && candidateData.name && (
          <Typography variant="h4" gutterBottom>
          {candidateData.name}
        </Typography>
      )}
      
      <List component="nav" className={classes.root}>
        {candidateData &&
        candidateData.coursesList &&
        candidateData.coursesList.length > 0 ? (
            
          candidateData.coursesList.map((item, key) => (
            <>
              <ListItem button alignItems="flex-start" onClick={() => navigateToCourseHome(item.type)}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.type_name}(${item.type_name_eng})`}
                  // secondary="ഖുർആൻ ലേണിംഗ് പ്രോഗ്രാം"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))
        ) : (
          <h2> Not enrolled courses list</h2>
        )}
      </List>
    </>
  );
};
