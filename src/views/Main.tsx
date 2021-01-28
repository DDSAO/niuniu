import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CurrentPage } from './CurrentPage';
import NavBar from '../component/NavBar/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

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
    /*
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    */
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')] : {
      padding: 0,
      width: "100%"
    }
  },
 
}));

export const Main = ()  => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CurrentPage />
      </main>
    </div>
  );
}
