import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserLogin } from "./UserLogin";
//import { NoMatch } from './NoMatch';
import { UserListing } from "./UserListing";
import { CourseHome } from "./CourseHome";
import { SiteContext } from "./SiteContext";
import { Spinner } from "./components/Spinner";
import { PreLogin } from "./PreLogin";

const BASE_API_URL = "https://prms.peaceradio.com/courses2/apis/register/";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [existingUser, setExistingUser] = useState(null);
  useEffect(() => {
    var formdata = new FormData();
    formdata.append("userId", window.myToken);
    const endpoint = `${BASE_API_URL}getRegisteredCandidatesData.php`;

    fetch(endpoint, {
      method: "POST",
      body: formdata,
      redirect: "follow"
    })
      .then(resp => resp.json())
      .then(function(response) {
        console.log("response", response);
        setLoading(false);
        setIsLoggedIn(
          response[0].success === "Y" && response[0].registered === "Y"
            ? true
            : false
        );
        if (response[0].success === "Y" && response[0].registered === "Y") {
          setExistingUser(response[0]);
        }
      });
  }, []);

  const PRContextData = {
    setExistingUser,
    existingUser,
    setIsLoggedIn,
    apiURL: BASE_API_URL
  };

  return (
    <SiteContext.Provider value={PRContextData}>
      <Router>
        {/* <Route exact path="/userListing" component={UserListing} /> */}
        <Route exact path="/userlogin" component={UserLogin} />
        <Route exact path="/membercourse" component={CourseHome} />
        <Route
          exact
          path="/"
          component={() =>
            loading ? <Spinner /> : isLoggedIn ? <UserListing /> : <PreLogin />
          }
        />
      </Router>
    </SiteContext.Provider>
  );
}

export default App;
