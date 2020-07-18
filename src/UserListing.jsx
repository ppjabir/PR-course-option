import React, { useContext } from "react";
import { SiteContext } from "./SiteContext";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import { Container } from "@material-ui/core";
export const UserListing = () => {
  var contextData = useContext(SiteContext);
  const { existingUser } = contextData;
  const history = useHistory();
  const handleMemberClick = () => {
   
        history.push("/membercourse");
        //history.push("/userlogin");
      
  }
  return (
    <Styles>
      <Container maxWidth="sm">
        {existingUser ? (
          <div>
            {existingUser.memberList.map((item, key) => (
              <div key={key} className="member-container" onClick={()=>handleMemberClick()}>
                <p>Name: {item.name}</p>
                {item.age && <p>age: {item.age}</p>}
                {item.rollNumber && <p>Roll Number: {item.rollNumber}</p>}
                <p>
                  {item.answeredToday === "N"
                    ? "അവസാന ക്ലാസ്സിലെ ഉത്തരം അയച്ചിട്ടില്ല"
                    : "അവസാന ക്ലാസ്സിലെ ഉത്തരം അയച്ചു"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <h2>NO Data</h2>
        )}
      </Container>
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
