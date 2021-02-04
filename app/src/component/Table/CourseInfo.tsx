import { Button, Card, Grid, Hidden, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: grey[100],
        display: "flex",
        flexDirection:"column",
        justifyContent:"flexCenter",
        alignItems:"center",
    },
    table:{
        width: "calc(100% - 64px)",
        marginTop: theme.spacing(2),
    },
    grid: {
        margin: theme.spacing(2, 0),
        display:"flex",
        justifyContent:"center",  
    },
    buttonBox: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",

    },
    firstColumn: {
        width:200,
        [theme.breakpoints.down('sm')]:{
            width:70,
        },
        [theme.breakpoints.up('lg')]:{
            width:300,
        }
    },
    changeButton: {
        margin: theme.spacing(1)
    },
    button: {
        margin: "auto",
        width: "200px",
    }
}))
type courseData = {
    pHour: number,
    aHour: number,
    pHourPast: number,
    aHourPast: number,
}
const CourseInfo = (props: {data: courseData}) => {
    const classes = useStyles()
    const { data } = props

    const [pHour, setP] = useState(data.pHour)
    const [aHour, setA] = useState(data.aHour)

    const [pChangeText, setPChangeText] = useState("")
    const [aChangeText, setAChangeText] = useState("")

    const [pToConfirm, setPToConfirm] = useState(false)
    const [aToConfirm, setAToConfirm] = useState(false)

    const [pChangeValue, setPChangeValue] = useState(0)
    const [aChangeValue, setAChangeValue] = useState(0)

    const [pErrorMessage, setPErrorMessage] = useState("")
    const [aErrorMessage, setAErrorMessage] = useState("")

    const reset = () => {
        setP(data.pHour)
        setA(data.aHour)
        setPChangeText("")
        setAChangeText("")
        setPToConfirm(false)
        setAToConfirm(false)
        setPChangeValue(0)
        setAChangeValue(0)
        setPErrorMessage("")
        setAErrorMessage("")
    }
    const displayText = (initValue: number, changeValue:number, toConfirm: boolean = false): JSX.Element => {
        if (changeValue === 0) return <p>{String(initValue)}</p>
        if (toConfirm) {
            return (
            <div>
                <del style={{color: "grey", display:"inline-block", padding: "0 8px"}}>{initValue}</del>&raquo;
                <strong style={{color: changeValue > 0 ? "green" : "red", display:"inline-block", padding: "0 8px"}}>{initValue + changeValue}</strong>
            </div>)
        } else {
            if (changeValue > 0) {
                return <p>{initValue + " + " + changeValue}</p>
            } else {
                return <p>{initValue + " - " + Math.abs(changeValue)}</p>
            } 
        }
        

    }
    return (
        <Card className={classes.root}>
            <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center" className={classes.firstColumn} component="th">课程</TableCell>
                    <TableCell align="center">已上课时</TableCell>
                    <TableCell align="center">剩余课时</TableCell>
                    <TableCell size="small" align="center">增减剩余课时</TableCell>   
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"钢琴"}>
                        <TableCell align="center" component="th" scope="row" className={classes.firstColumn}>钢琴</TableCell>
                        <TableCell align="center">{data.pHourPast}</TableCell>
                        <TableCell align="center">
                            {displayText(pHour, pChangeValue, pToConfirm)}
                        </TableCell>
                        <TableCell align="right">
                            <TextField 
                                id="pChange" 
                                label="钢琴课时增减" 
                                variant="outlined" 
                                value={pChangeText}
                                error={pErrorMessage.length > 0}
                                helperText={pErrorMessage}
                                inputProps={{style: {textAlign: "right"}}}
                                onChange={(e)=>{
                                    setPErrorMessage("")
                                    setPToConfirm(false)
                                    let value = e.target.value
                                    setPChangeText(value)
                                    if (value !== "") {
                                        if (! isNaN(parseInt(value))) {
                                            setPChangeValue(parseInt(value))
                                        } else if (value.length === 1 && (value.startsWith("+") || value.startsWith("-"))) {
                                            setPChangeValue(0)
                                        } else {
                                            setPChangeValue(0)
                                            setPErrorMessage("格式错误，正确示例: 1, +1, -1")
                                        }
                                    } else {
                                        setPChangeValue(0)
                                    }  
                                }}
                            />
                            <Button 
                            variant="outlined" color={pChangeValue >= 0 ? "primary" : "secondary"}
                            className={classes.changeButton}
                            onClick={() => setPToConfirm(true)}
                            >
                                确认{pChangeValue >= 0 ? "增加" : "减少"}
                            </Button>
                        </TableCell>  
                    </TableRow>
                    <TableRow key={"手工"}>
                        <TableCell align="center" component="th" scope="row" className={classes.firstColumn}>手工</TableCell>
                        <TableCell align="center">{data.aHourPast}</TableCell>
                        <TableCell align="center">
                            {displayText(aHour, aChangeValue, aToConfirm)}
                        </TableCell>
                        <TableCell align="right">
                            <TextField 
                                    id="aChange" 
                                    label="手工课时增减" 
                                    variant="outlined" 
                                    value={aChangeText}
                                    error={aErrorMessage.length > 0}
                                    helperText={aErrorMessage}
                                    inputProps={{style: {textAlign: "right"}}}
                                    onChange={(e)=>{
                                        setAErrorMessage("")
                                        setAToConfirm(false)
                                        let value = e.target.value
                                        setAChangeText(value)
                                        if (value !== "") {
                                            if (! isNaN(parseInt(value))) {
                                                setAChangeValue(parseInt(value))
                                            } else if (value.length === 1 && (value.startsWith("+") || value.startsWith("-"))) {
                                                setAChangeValue(0)
                                            } else {
                                                setAChangeValue(0)
                                                setAErrorMessage("格式错误，正确示例: 1, +1, -1")
                                            }
                                        } else {
                                            setAChangeValue(0)
                                        }  
                                    }}
                                />
                                <Button 
                                variant="outlined" color={aChangeValue >= 0 ? "primary" : "secondary"}
                                className={classes.changeButton}
                                onClick={() => setAToConfirm(true)}
                                >
                                    确认{aChangeValue >= 0 ? "增加" : "减少"}
                                </Button>
                            </TableCell>  
                    </TableRow>
                </TableBody>
            </Table>
            
            </TableContainer>
            <Grid container>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                <Button variant="contained" color="primary" onClick={()=>reset()}
                className={classes.button}>放弃更改</Button>
                </Grid>
                <Hidden only={["xs","sm"]}><Grid item  md={4} className={classes.grid} /></Hidden>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <Button variant="contained" color="primary" className={classes.button} disabled={!pToConfirm && !aToConfirm}>保存</Button>
                </Grid>  
            </Grid>
        </Card>
      );
}

export default CourseInfo