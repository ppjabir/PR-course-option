import React, { useContext } from "react";
import { SiteContext } from "./SiteContext";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: '#4AA882',
    paddingTop: 0,
    paddingBottom: '15px',
    color: '#fff'
  }
}));
export const UserListing = () => {
  var contextData = useContext(SiteContext);
  const { existingUser } = contextData;
  const history = useHistory();
  const handleMemberClick = () => {
    history.push("/membercourse");
    //history.push("/userlogin");
  };

  const classes = useStyles();
  return (
    <Styles>
      
        {existingUser ? (
          <List component="nav" className={classes.root}>
            {existingUser.memberList.map((item, key) => (
              <>
                <ListItem button key={key} onClick={() => handleMemberClick()}>
                  <ListItemText>
                    <p>Name: {item.name}</p>
                    {item.age && <p>age: {item.age}</p>}
                    {item.rollNumber && <p>Roll Number: {item.rollNumber}</p>}
                    <p>
                      {item.answeredToday === "N"
                        ? "അവസാന ക്ലാസ്സിലെ ഉത്തരം അയച്ചിട്ടില്ല"
                        : "അവസാന ക്ലാസ്സിലെ ഉത്തരം അയച്ചു"}
                    </p>
                  </ListItemText>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
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
