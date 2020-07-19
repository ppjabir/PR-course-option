import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SiteContext } from "./SiteContext";
import SwipeableViews from "react-swipeable-views";
import Styled from "styled-components";
import {
  Tabs,
  Tab,
  AppBar,
  Typography,
  Box
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    backgroundColor: theme.palette.background.paper
  }
}));

export const CourseHome = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   const useStyles = makeStyles(theme => ({
  //     root: {
  //       backgroundColor: theme.palette.background.paper,
  //       width: 500
  //     }
  //   }));
  //   const a11yProps = (index) => {
  //     return {
  //       id: `full-width-tab-${index}`,
  //       'aria-controls': `full-width-tabpanel-${index}`,
  //     };
  //   }
  const handleChangeIndex = index => {
    setValue(index);
  };
  const classes = useStyles();
  const theme = useTheme();
  return (
      <Styles>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Module" {...a11yProps(1)} />
            <Tab label="History" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
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
