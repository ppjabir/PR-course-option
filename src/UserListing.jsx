import React, { useContext } from "react";
import { SiteContext } from "./SiteContext";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Button
} from "@material-ui/core";
import NavBar from "./components/NavBar";

const PeaceRadioButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}))(Button);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "#4AA882",
    paddingTop: 0,
    paddingBottom: 0,
    color: "#fff",
    marginTop: "15px",
    marginBottom: "15px"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  buttonDiv: {
    flexGrow: 1
  },
  hrItem: {
    height: "15px",
    backgroundColor: "#fff"
  }
}));
export const UserListing = () => {
  var contextData = useContext(SiteContext);
  const { existingUser } = contextData;
  const history = useHistory();
  const handleMemberClick = memberRollNumber => {
    //history.push("/membercourse");
    //history.push("/userlogin");
    history.push({
      pathname: "/membercourse",
      memberRollNumber
    });
  };

  const addememberClick = userName => {
    console.log("parentData", userName);
    //history.push("/addmember",)
    history.push({
      pathname: "/addmember",
      userName
    });
  };

  const classes = useStyles();
  return (
    <Styles>
      {existingUser ? (
        <>
          <NavBar></NavBar>
          <List component="nav" className={classes.root}>
            {existingUser.memberList.map((item, key) => (
              <>
                <ListItem
                  button
                  key={key}
                  onClick={() => handleMemberClick(item.rollNumber)}
                >
                  <ListItemText>
                    <p>Name: {item.name}</p>
                    {item.age && <p>age: {item.age}</p>}
                    {item.rollNumber && <p>Roll Number: {item.rollNumber}</p>}
                    {item.answeredToday && (
                      <p>
                        {item.answeredToday === "N"
                          ? "അവസാന ക്ലാസ്സിലെ ഉത്തരം അയച്ചിട്ടില്ല"
                          : "അവസാന ക്ലാസ്സിലെ ഉത്തരം അയച്ചു"}
                      </p>
                    )}
                  </ListItemText>
                  <ListItemIcon>
                    <Avatar className={classes.large}>{item.name.charAt(0).toUpperCase()}</Avatar>
                  </ListItemIcon>
                </ListItem>
                <Divider className={classes.hrItem} />
              </>
            ))}
          </List>

          <PeaceRadioButton
            fullWidth
            type="button"
            variant="contained"
            onClick={() => addememberClick(existingUser.userName)}
          >
            Add Member
          </PeaceRadioButton>
        </>
      ) : (
        <h2>NO Data</h2>
      )}
    </Styles>
  );
};

const Styles = Styled.div`
    .member-container {
        background-color: #4AA882;
        padding: 10px;
        color: #fff;
        border-radius: 10px;
        margin: 15px 0
    }
`;
