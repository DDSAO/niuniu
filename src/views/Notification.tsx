
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Toolbar, Divider, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { INotification, IState } from '../redux/types';
import NotificationTable from './../component/Table/NotificationTable';
import { INotifications, NotificationKeys } from './../redux/types';
import Schedule from './Schedule';
import { LabelSharp } from '@material-ui/icons';
import { addNotification } from '../redux/actions';


const useStyles = makeStyles(theme => ({
    root: {
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tabs: {
        flexGrow: 1,
        width: "100%",
    },
    toolbar: {
        width: "100%",
        padding: "10px",
    },
    box: {
        background: "grey",
    },
    noti: {
        display:"flex",
        flexDirection: "column",
    },
    notiContent: {
        background: "white",
        padding: theme.spacing(1),
        //marginBottom: theme.spacing(1),
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    },
    notiText: {
        textAlign: "left",
    },
    notiTime: {
        [theme.breakpoints.down('sm')] :{
            minWidth: "100px",
        },
        minWidth: "150px",   
    }
}))

const TabPanel = (props: {children: JSX.Element|string, value: number, index:number}) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} >
                {children}
          </Box>
        )}
      </div>
    );
}

const NotificationRow = (props: {text: string, date: Date}) => {
    const classes = useStyles()
    let {text, date} = props
    let timeString
    if (Date.now() - date.getTime() < 60 * 1000) {
        timeString = "刚刚"
    } else if (Date.now() - date.getTime() < 60 * 60 * 1000) {
        timeString = Math.round((Date.now() - date.getTime())/60000) + "分钟前"
    } else if (Date.now() - date.getTime() < 24 * 60 * 60 * 1000) {
        timeString = Math.round((Date.now() - date.getTime())/(60 * 60000)) + "小时前"
    } else {
        timeString = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 "+date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()
    }

    return (
    <div className={classes.noti}>
        <div className={classes.notiContent}>
            <div className={classes.notiText}>{text}</div>
            <div className={classes.notiTime}>{timeString}</div>
        </div>
        <Divider/>
        
    </div>)
}


const Notification = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState(0);

    const allNotifications = useSelector((state: IState): INotifications => state.notifications)

    const handleChange = (event:React.ChangeEvent<{}>, newValue:number) => {
        setValue(newValue);
    };

    const [studentLabel, setStudentLabel] = useState("学生")
    const [scheduleLabel, setScheduleLabel] = useState("课程")
    const [courseHourLabel, setCourseHourLabel] = useState("课时")
    const [practiceLabel, setPracticeLabel] = useState("练习")
    
  

    useEffect(() => {
        Object.entries(allNotifications).forEach(([category,notifications]: Array<keyof INotifications | INotifications>) => {
            let newCount = 0
            if (Array.isArray(notifications)) {
                notifications.forEach((noti) => {
                    if (noti.isNew) newCount += 1
                })
            }
            if (typeof category === 'string') {
                switch (category) {
                    case "student": {
                        newCount > 0 ? setStudentLabel(`学生 (${newCount}条新信息)`) : setStudentLabel("学生")
                        break
                    }
                    case "schedule": {
                        newCount > 0 ? setScheduleLabel(`课程 (${newCount}条新信息)`) : setScheduleLabel("课程")
                        break
                    }
                    case "courseHour": {
                        newCount > 0 ? setCourseHourLabel(`课时 (${newCount}条新信息)`) : setCourseHourLabel("课时")
                        break
                    }
                    case "practice": {
                        newCount > 0 ? setPracticeLabel(`练习 (${newCount}条新信息)`) : setPracticeLabel("练习")
                        break
                    }
                    default: return
                }
            }  
        })
    }, [allNotifications])


    return(
    <Container className={classes.root}>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5">消息提醒</Typography>
        </Toolbar>
        <Paper className={classes.tabs}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
            >
                <Tab label={studentLabel} />
                <Tab label={scheduleLabel} />
                <Tab label={courseHourLabel} />
                <Tab label={practiceLabel} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <NotificationTable searchWord="" category="student"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NotificationTable searchWord="" category="schedule"/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <NotificationTable searchWord="" category="courseHour"/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <NotificationTable searchWord="" category="practice"/>
            </TabPanel>
        </Paper>
        <Button onClick={() => {
            enqueueSnackbar('I love hooks', {variant: "success"})
            dispatch(addNotification("一条新消息","student","error"))
        }}>显示消息</Button>
    </Container>)
}

export default Notification