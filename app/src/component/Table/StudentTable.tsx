import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Card, Divider, Grid } from '@material-ui/core';
import StudentInfo from '../Form/StudentInfo';
import CourseInfo from './CourseInfo';
import { IStudent } from './../../redux/types';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function Row(props: {row: IStudent}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={() => setOpen(!open)} selected={open} hover={true}>
        <TableCell >
          <IconButton aria-label="expand row" size="small" >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.gender ? "男":"女"}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        
        <TableCell align="right">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                课时信息
              </Typography>
              <CourseInfo data={row}/>
              <Typography variant="h6" gutterBottom component="div" style={{marginTop: 16, marginBottom:8}}>
                详细资料 - 学号：{row.id}
              </Typography>
              <Card>
                <StudentInfo data={row} />
              </Card>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function StudentTable(props: {data: IStudent[], filterWord: string}) {
  const { data, filterWord } = props
 
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>姓名</TableCell>
            <TableCell align="right">性别</TableCell>
            <TableCell align="right">电话</TableCell>
            <TableCell align="right">住址</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter((student: IStudent): boolean => student.name.includes(filterWord)).map((row: IStudent) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>

      
    </TableContainer>
  );
}
