import { Container, Typography, Toolbar, Divider } from '@material-ui/core';
import React from 'react';
import EmptyStudentInfo from '../component/Form/EmptyStudentInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
    },
    toolbar: {
        width: "100%",
        padding: "10px",
    }
}))

const AddStudent = () => {
    const classes = useStyles()
    return(
        <Container className={classes.root}>
           <Toolbar className={classes.toolbar}>
                <Typography variant="h5">添加学生</Typography>
            </Toolbar>
            <EmptyStudentInfo />
        </Container>
        
    )
}

export default AddStudent