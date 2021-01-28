import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import ThreeDButton from '../component/Button/ThreeDButton';
import ScrollCounter from '../component/Counter/SimpleCounter';
import SimpleCounter from './../component/Counter/SimpleCounter';
import { useDispatch, useSelector } from 'react-redux';
import { resetCounting, toggleCounting } from './../redux/actions';
import { IState } from './../redux/types';



const useStyles = makeStyles((theme) => ({
   
    root: {
        
    },
    counterFlame: {
        display: "flex",
        alignItems:"center",
        justifyContent:"center"
    }
}))

const Course = () => {
    
    const classes = useStyles()
    const dispatch = useDispatch()

    const [toggleText, setToggleText] = useState("")
    const isCounting = useSelector((state:IState): boolean => state.courseCounter.counting)

    useEffect(()=> {
        console.log(isCounting)
        if (isCounting) {
            setToggleText("暂停")
        } else {
            setToggleText("开始上课")
        }
    }, [isCounting])

    return(
    <Container className={classes.root}>
        <Container>
            <ThreeDButton text={toggleText} onClickF={() => {
                dispatch(toggleCounting())
                console.log("clicked")
            }}/>
            <ThreeDButton text="下课" onClickF={() => dispatch(resetCounting())}/>
        </Container>
        <Container className={classes.counterFlame}>
            <SimpleCounter/>
        </Container>
        
        
    </Container>)
}

export default Course