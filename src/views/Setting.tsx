import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './../redux/types';
import { Container, Paper, Typography, Switch } from '@material-ui/core';
import { toggleAutoRead } from '../redux/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent:"flex-start",
    },
    settingRow: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
}))

const Setting = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const setting = useSelector((state: IState) => state.setting)

    return(
    <Container className={classes.root}>
        <Typography variant="h6">消息提醒</Typography>
        <Paper className={classes.settingRow}>
            <Typography>自动阅读未读信息</Typography>
            <Switch color="primary" checked={setting.autoReadNotification} onChange={()=>dispatch(toggleAutoRead())}/>
        </Paper>
    </Container>)
}

export default Setting