import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserRegister } from "./UserRegister";
//import { NoMatch } from './NoMatch';
import { UserListing } from "./UserListing";
import { CourseHome } from "./CourseHome";
import { SiteContext } from "./SiteContext";
import { Spinner } from "./components/Spinner";
import { PreLogin } from "./PreLogin";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const BASE_API_URL = "https://prms.peaceradio.com/courses2/apis/register/";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#CCEEE6',
      main: '#00A881',
      dark: '#004431',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'Noto Sans Malayalam',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      'Arial',
    ].join(','),
    fontSize: 16,
  },
});
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
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Route exact path="/userListing" component={UserListing} /> */}
          <Route exact path="/userregister" component={UserRegister} />
          <Route exact path="/membercourse" component={CourseHome} />
          <Route
            exact
            path="/"
            component={() =>
              loading ? (
                <Spinner />
              ) : isLoggedIn ? (
                <UserListing />
              ) : (
                <PreLogin />
              )
            }
          />
        </Router>
      </ThemeProvider>
    </SiteContext.Provider>
  );
}

export default App;
