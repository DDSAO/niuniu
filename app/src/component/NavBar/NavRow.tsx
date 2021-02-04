import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import  ListItem  from '@material-ui/core/ListItem';
import  ListItemIcon  from '@material-ui/core/ListItemIcon';
import  ListItemText  from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
    navBarRow: {
        textDecoration: "none",
        color: "black",
        '&:hover .navBarRow': {
            backgroundColor: "rgba(247, 132, 115, 0.7)",
        }
    },
    activeRow: {
        '& .navBarRow' :{
            textDecoration: "none",
            backgroundColor: "rgba(247, 132, 115, 0.5)",
        }
        
    }
}))

const NavRow = (props: {text: string, to: string, children?:any}) => {
    const classes = useStyles()
    const [isActive, setActive] = useState(false)
    return(
        <NavLink  key={props.text} to={props.to}    
        className={classes.navBarRow} activeClassName={clsx(classes.navBarRow, classes.activeRow)}>
            <ListItem button className="navBarRow">
                <ListItemIcon >{props.children}</ListItemIcon>
                <ListItemText  primary={props.text} />
            </ListItem>
        </NavLink>
        
    )
}

export default NavRow