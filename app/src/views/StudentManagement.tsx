import React, { useEffect, useState } from 'react';
import clsx from 'clsx'
import { Container, InputLabel, OutlinedInput, TextField, Toolbar, FormControl, InputAdornment, FilledInput, IconButton } from '@material-ui/core';
import StudentTable from '../component/Table/StudentTable';
import  Typography  from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import { IStudent } from '../redux/types';
import { useSelector } from 'react-redux';
import { IState } from './../redux/types';





const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: "space-between",
        padding: "10px",
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}))


const StudentManagement = () => {
    const classes = useStyles()
    const students = useSelector((state: IState) => state.students)

    const [filterWord, setFilterWord] = useState("")

    return(
        <Container>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5">学生管理</Typography>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                    <InputLabel htmlFor="search-student">搜索</InputLabel>
                    <FilledInput 
                    id="search-student" 
                    value={filterWord}
                    onChange={e => setFilterWord(e.target.value)} 
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setFilterWord("")}
                            edge="end"
                            >
                                <HighlightOffIcon/>
                            </IconButton>
                     
                        </InputAdornment>}

                    />   
                </FormControl>
                   
            </Toolbar>
            <StudentTable data={students} filterWord={filterWord}/>
        </Container>
    )
}

export default StudentManagement