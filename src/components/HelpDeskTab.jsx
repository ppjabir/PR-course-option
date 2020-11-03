import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FaqList } from "./FaqList";
import { GradeHistory } from "./GradeHistory"

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));
export const HelpDeskTab = props => {
  console.log("helpdeskdata", props);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.data && props.data.faq && props.data.faq.length > 0 && (
        <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Frequently Asked Questions (FAQs) Malayalam
            </Typography>
          </AccordionSummary>
          <FaqList data={props.data.faq} />
          
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Late Exam Request<br/>
              {props.data.ler.reasonList.map(reason =>(
                <span className={classes.spanText}> {reason.reasonText} / </span>
              ))}
            </Typography>
          </AccordionSummary>
          <FaqList data={props.data.faq} />
          
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Grade History<br/>
              (Malayalam)
            </Typography>
          </AccordionSummary>
          <GradeHistory data={props.data.gradeHistory} />
          
        </Accordion>
        </>
      )}
    </div>
  );
};
