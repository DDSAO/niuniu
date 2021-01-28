import React from 'react';
import { Route, Switch } from "react-router";
import Course from './Course';
import NoMatch from './NoMatch';
import AddStudent from './AddStudent';
import StudentManagement from './StudentManagement';
import Schedule from './Schedule';
import Setting from './Setting';
import Notification from './Notification';
import Dashboard from './Dashboard';



export const CurrentPage = () => {
    return (
    <Switch>
        <Route exact path="/" component={Course} />
        <Route path="/course" component={Course} />
        <Route path="/addstudent" component={AddStudent} />
        <Route path="/studentmanagement" component={StudentManagement} />
        <Route path="/schedule" component={Schedule} />

        <Route path="/notification" component={Notification} />
        <Route path="/setting" component={Setting} />
        <Route path="/dashboard" component={Dashboard} />

        <Route component={NoMatch} />
    </Switch>
    )
}

