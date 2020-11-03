import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { SiteContext } from "./SiteContext";
import SwipeableViews from "react-swipeable-views";
import Styled from "styled-components";
import { Tabs, Tab, AppBar, Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NavBar from "./components/NavBar";
import { Profile } from "./components/Profile";
import { ModuleTab } from "./components/ModuleTab";
import {HelpDeskTab} from "./components/HelpDeskTab";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useHistory } from "react-router-dom";
import Fab from "./components/Fab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    boxShadow: "none"
  },
  tab: {
    position: "relative",
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0 2px 5px 2px rgba(0, 0, 0, .2)"
  },
  tabPanelSwipe: {
    backgroundColor: "#FFF",
    height: "100%"
    // boxShadow: '0 2px 5px 2px rgba(0, 0, 0, .2)',
  }
}));

export const CourseHome = props => {
  var contextData = useContext(SiteContext);
  const { apiURL } = contextData;
  const [value, setValue] = useState(0);
  const [homeTabData, setHomeTabData] = useState(null);
  const [moduleTabData, setModuleTabData] = useState(null);
  const [helpDeskTabData, setHelpDeskTabData] = useState(null);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    if (props.location && props.location.courseName) {
      var formdata = new FormData();
      formdata.append("userId", window.myToken);
      formdata.append("courseType", props.location.courseName);
      formdata.append("rollNumber", props.location.selectedRollNumber);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };
      const endpoint = `${apiURL}course/getHomePageForCourse.php`;
      const endpointModule = `${apiURL}course/getModulePageForCourse.php`;
      const endPointHelpDesk = `${apiURL}course/getHistoryPageForCourse.php`;
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success === "Y") {
            setHomeTabData(result);
          }
        });
      fetch(endpointModule, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success === "Y") {
            setModuleTabData(result);
          }
        });
        fetch(endPointHelpDesk, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success === "Y") {
            setHelpDeskTabData(result);
          }
        });
    } else {
      history.push("/");
    }
  }, []);
  return (
    <Styles>
      <div className={classes.root}>
        <NavBar></NavBar>
        <AppBar position="static" color="default">
          <Tabs
            className={classes.tab}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            // textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<HomeIcon />} label="Home" {...a11yProps(0)} />
            <Tab icon={<SchoolIcon />} label="Module" {...a11yProps(1)} />
            <Tab icon={<MenuBookIcon />} label="History" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.tabPanelSwipe}
        >
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={0}
            dir={theme.direction}
          >
            <Profile data={homeTabData} />
          </TabPanel>
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={1}
            dir={theme.direction}
          >
            <ModuleTab data={moduleTabData} />
          </TabPanel>
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={2}
            dir={theme.direction}
          >
            <HelpDeskTab data={helpDeskTabData} />
          </TabPanel>
          <Fab />
        </SwipeableViews>
      </div>
    </Styles>
  );
};

const Styles = Styled.div`
 .MuiList-padding {
     padding: 0 0 15px 0;
 }
`;
