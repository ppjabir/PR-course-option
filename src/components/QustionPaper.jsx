import React, { useState, useRef, useContext } from "react";
import Carousel from "react-material-ui-carousel";
import AudioPlayer from "react-h5-audio-player";
import { SiteContext } from "../SiteContext";
import "react-h5-audio-player/lib/styles.css";
import {
  makeStyles,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

export const QustionPaper = props => {
  var contextData = useContext(SiteContext);
  const { audioURL } = contextData;
  const [ansValue, setAnsValue] = useState({
    q0Value: "",
    q1Value: "",
    q2Value: ""
  });
  const handleRadioChange = (event, index) => {
    console.log("index", index);
    console.log("event", event.target.value);
    if (index === 0) {
      //setQ0Value(event.target.value)
      setAnsValue(prevState => ({
        ...prevState,
        q0Value: event.target.value
      }));
    } else if (index === 1) {
      //setQ1Value(event.target.value)
      setAnsValue(prevState => ({
        ...prevState,
        q1Value: event.target.value
      }));
    } else {
      //setQ2Value(event.target.value)
      setAnsValue(prevState => ({
        ...prevState,
        q2Value: event.target.value
      }));
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
  };
  const classes = useStyles();

  const myref = useRef();

  var todayQuestionsArray = [];
  if (props.data && props.data.length > 0) {
    todayQuestionsArray = props.data;
  }

  const handleClick = qNumber => {
    myref.current.pressIndicator(qNumber);
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick(0)}
      >
        Q1
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick(1)}
      >
        Q2
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick(2)}
      >
        Q3
      </Button>

      <Paper>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" className={classes.formControl}>
            <Carousel
              ref={myref}
              animation="fade"
              autoPlay={false}
              navButtonsAlwaysInvisible={true}
            >
              {todayQuestionsArray.map((item, i) => (
                <>
                  <FormLabel component="legend">{item.question}</FormLabel>
                  <AudioPlayer
                    autoPlay={false}
                    showSkipControls={false}
                    showJumpControls={false}
                    volume={0.8}
                    src={`${audioURL}${item.questionAudio}`}
                    loop={false}
                    loopOff={true}
                    customAdditionalControls={[]}
                    // other props here
                  />
                  <RadioGroup
                    aria-label={item.question}
                    name={item.question}
                    value={ansValue[`q${i}Value`]}
                    onChange={e => handleRadioChange(e, i)}
                  >
                    <FormControlLabel
                      value={item.answerOptionA}
                      control={<Radio />}
                      label={item.answerOptionA}
                    />
                    <FormControlLabel
                      value={item.answerOptionB}
                      control={<Radio />}
                      label={item.answerOptionB}
                    />
                    <FormControlLabel
                      value={item.answerOptionC}
                      control={<Radio />}
                      label={item.answerOptionC}
                    />
                  </RadioGroup>
                </>
              ))}
            </Carousel>
          </FormControl>

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            submit
          </Button>
        </form>
      </Paper>
    </>
  );
};
