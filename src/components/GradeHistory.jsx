import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    
  },
  parentDiv: {
    marginBottom: 20
  }
});





export const GradeHistory = props => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      {props.data.map(row => (
        <div className={classes.parentDiv}>
        <Box mb={0} fontWeight="fontWeightBold" m={1}>
            Module - {row.module}
        </Box>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align="center">Marks</TableCell>
              <TableCell align="center">
                Weighted <br />
                Percentate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.assignmentMark && (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  Assignment Mark
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.assignmentMark}
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.assignmentPercent}
                </TableCell>
              </TableRow>
            )}

            {row.classTestMark && (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  Class Tests
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.classTestMark}
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.classTestPercent}
                </TableCell>
              </TableRow>
            )}
            {row.finalExamMark && (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  Final Exam
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.finalExamMark}
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.finalExamPercent}
                </TableCell>
              </TableRow>
            )}

            {row.totalMark && (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  Total Marks
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.totalMark}
                </TableCell>
                <TableCell component="th" align="center"  scope="row">
                  {row.totalPercent}
                </TableCell>
              </TableRow>
            )}

            {row.rank && (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  Rank
                </TableCell>
                <TableCell component="th" scope="row">
                  
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.rank}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      ))}
    </TableContainer>
  );
};
