import React, { useState, useContext } from "react";
import {QustionPaper} from './QustionPaper';
import AudioPlayer from "react-h5-audio-player";
import { SiteContext } from "../SiteContext";
import "react-h5-audio-player/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Collapse,
  Box,
  Button
} from "@material-ui/core";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

function Row(props) {
    console.log('rows props', props)
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const classes = useRowStyles();
  var contextData = useContext(SiteContext);
  const { audioURL } = contextData;

  const classTestclick = () => {
    setOpen(!open)
    setAudioOpen(false)
  }
  const audioPlayClick = () => {
    setOpen(false)
    setAudioOpen(!audioOpen)
  }
  
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell align="right">class {row.class}</TableCell>

        <TableCell align="right">
        <Button variant="outlined" color="primary"  onClick={() => audioPlayClick()}>
       Play
      </Button>
        </TableCell>

        {/* <TableCell align="right"></TableCell> */}
        <TableCell>
          {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
          <Button variant="contained" color="primary" aria-label="expand row"
            size="small"
            onClick={() => classTestclick()}>
                Class Test
                </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <QustionPaper data={row.questions} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={audioOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <AudioPlayer
                      autoPlay={false}
                      showSkipControls={false}
                      showJumpControls={false}
                      volume={0.8}
                      src={`${audioURL}${row.classAudio}`}
                      loop={false}
                      loopOff={true}
                      customAdditionalControls={[]}
                      // other props here
                    />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export const ModuleTab = props => {
  console.log("Module props", props.data);

  return (
    <>
      {props.data &&
      props.data.classTests &&
      props.data.classTests.classTestList[0].length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {props.data.classTests.classTestList[0].map(row => (
                <Row key={row.class} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2>NO data</h2>
      )}
    </>
  );
};
