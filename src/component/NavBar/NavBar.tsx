import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventNoteIcon from '@material-ui/icons/EventNote';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import NavRow from './NavRow';
import { Badge, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState, INotifications } from './../../redux/types';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')] : {
      padding: 0,
      margin:0,
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down('xs')]: {
      width: 0
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  titleBar: {
    padding: theme.spacing(0, 2),
  },
  BgPink: {
    background: theme.palette.error.light,
  },
  BgBlue: {
    background: theme.palette.info.light,
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newNotiCount, setNewNotiCount] = useState(0)

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const allNotifications = useSelector((state: IState): INotifications => state.notifications)

  useEffect(() => {
    
    let newCount = 0
    Object.entries(allNotifications).forEach(([category,notifications]: Array<keyof INotifications | INotifications>) => {
      if (Array.isArray(notifications)) {
          notifications.forEach((noti) => {
            if (noti.isNew) newCount += 1
          })
      } 
    })
    setNewNotiCount(newCount)
  }, [allNotifications])
  return (
    <Container fixed className={clsx(classes.drawer, {
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    })}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={clsx(classes.titleBar, classes.BgPink)}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            牛牛管理界面
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={clsx(classes.toolbar)}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavRow to="course" text="课程安排"><MenuBookIcon /></NavRow>
          <NavRow to="addstudent" text="添加学生"><PersonAddIcon /></NavRow>
          <NavRow to="studentmanagement" text="学生管理"><AssignmentIndIcon /></NavRow>
          <NavRow to="schedule" text="课程安排"><EventNoteIcon /></NavRow>
        </List>
        <Divider />
        <List>
          <NavRow to="notification" text="提醒"><Badge badgeContent={newNotiCount} max={99} color="primary"><NotificationsNoneIcon /></Badge></NavRow>
          <NavRow to="setting" text="设置"><SettingsIcon /></NavRow>
          <NavRow to="dashboard" text="统计"><TrendingUpIcon /></NavRow>
        </List>
      </Drawer>
    </Container>
  );
}

export default NavBar
