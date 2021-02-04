import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../redux/types';
import { dispatch, tickIncrement } from 'd3';
import { clearedCounter, toggleCounting } from './../../redux/actions';

const useStyles = makeStyles((theme) => ({
    container: {
        position: "relative",
        height: 100,
        width: 400,
        //background:"green",
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60
        
    },
    digit: {
        position: "absolute",

    },
    countingDigit: {
        color: "green",
    }
}))

const DigitBlock = () => {
    
}

const SimpleCounter = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const courseCounter = useSelector((state: IState) => state.courseCounter)

    const [counterTime, setCounterTime] = useState(0)
    const [hour1, setHour1] = useState(0)
    const [hour2, setHour2]  = useState(0)
    const [minute1, setMinute1]  = useState(0)
    const [minute2, setMinute2]  = useState(0)
    const [second1, setSecond1]  = useState(0)
    const [second2, setSecond2]  = useState(0)

   

    const tick = () => {
        setCounterTime(counterTime => counterTime + 1)
    }

  
    useEffect(() => {
        let tickInterval: NodeJS.Timeout
        if (courseCounter.counting) {
            tickInterval = setInterval(tick, 1000)
        }
        return () => clearInterval(tickInterval)
    }, [courseCounter.counting])

    useEffect(() => {
        if (courseCounter.shouldReset) {
            setCounterTime(0)
            dispatch(toggleCounting())
            dispatch(clearedCounter())
            
        }
    }, [courseCounter.shouldReset])

    return (
    <div className = {clsx({[classes.container]: true, [classes.countingDigit]: courseCounter.counting})}>
        {Math.floor(Math.floor(counterTime/3600)/10)}{Math.floor(counterTime/3600)%10}: 
        {Math.floor(Math.floor(counterTime/60)/10)%6}{Math.floor(counterTime/60)%10}: 
        {Math.floor(counterTime%60/10)}{counterTime%10}
    </div>)
}

export default SimpleCounter;