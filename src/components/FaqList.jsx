import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AccordionDetails, Typography, Box } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper
  },
  qhead: {
    paddingBottom: 0
  }
}));

export const FaqList = props => {
  const classes = useStyles();
  console.log("faqlist", props);
  return (
    <>
      {props.data.map(faqItem => (
        <>
          <AccordionDetails className={classes.qhead}>
            <Typography variant="body2"><Box fontWeight="fontWeightBold">{faqItem.qstnText}</Box></Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography variant="body2">{faqItem.answer}</Typography>
          </AccordionDetails>
        </>
      ))}
    </>
  );
};
