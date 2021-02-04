import React, { useEffect, useRef } from 'react';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import { Card, Container, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { clearNewEvent, clearSelectedEvent, selectedDate, selectEvent, toggleCreateEventDialog, toggleEditEventDialog, updatedCalendarAfterEdit, updateEventDate } from '../redux/actions';
import CreateEvent from '../component/Dialog/CreateEvent';
import EditEvent from '../component/Dialog/EditEvent';
import { IState, IEvent } from '../redux/types';
import { updatedCalendarAfterDelete } from './../redux/actions';




const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')] : {
            width: "100%"
        }
    },
    toolbar: {
        justifyContent: "space-between",
        padding: "10px",
    },
    card: {
        //padding: 10,
    }
}))

const Schedule = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const event = useSelector((state: IState) => state.newEvent) //new event
    const events = useSelector((state: IState) => state.allEvents) //all event
    const selectedEId = useSelector((state: IState) => state.selectedEId)
    const hasEdittedEvent = useSelector((state: IState) => state.hasEdittedEvent)
    const hasDeletedEvent = useSelector((state: IState) => state.hasDeletedEvent)
    const calendar = useRef<any>(null)
    const container = useRef(null)

    const parseCalendarEvent = (info: IEvent) => {
        if (info) {
            let title = info.students.length === 0 ? "未选定学生" : info.students.length > 1 ? info.students[0] + " 等" : info.students[0]
            return {
                id: String(info.id),
                title:　title,
                start: info.year+'-'+info.month+'-'+(info.date < 10 ? '0'+info.date : info.date)+'T'+info.start+':00',
                end: info.year+'-'+info.month+'-'+(info.date < 10 ? '0'+info.date : info.date)+'T'+info.end+':00',
            }
        } else {
            throw "event info not defined"
        }
    }
    
    useEffect(()=>{
        console.log(Object.values(events).map((info) => {
            return parseCalendarEvent(info)
        }))
        calendar.current = new Calendar(container.current as unknown as HTMLElement, {
            plugins: [ interactionPlugin, dayGridPlugin, listPlugin],
            dayMaxEventRows: true,
            locale: zhLocale,
            handleWindowResize: false,
            aspectRatio: window.innerWidth < 600 ? 0.4 : window.innerWidth < 960 ? 1.3 : 1.8,
            headerToolbar: {
                start: 'prev,next today', // will normally be on the left. if RTL, will be on the right
                center: 'title',
                end: 'dayGridMonth,list' // will normally be on the right. if RTL, will be on the left
            },
            buttonText: {
                today: "返回今日",
                list: "按列表显示",
                dayGridMonth: "按月显示"
            },
            selectable: true,
            dateClick: ( info ) => {
                dispatch(selectedDate(info.date))
                dispatch(toggleCreateEventDialog())
            },
            editable: true,
            droppable: false,
            eventDrop: (info) => {
                let { event } = info
                if (event && event.start) {
                    let id = parseInt(event.id)
                    let year = event.start.getFullYear()
                    let month = event.start.getMonth() + 1
                    let date = event.start.getDate()
                    dispatch(updateEventDate(id, year, month, date))
                } else {
                    throw "Cannot find event info"
                }
            },
            eventClick: (info) => {
                dispatch(selectEvent(parseInt(info.event.id)))
                dispatch(toggleEditEventDialog())
            },
            events: Object.values(events).map((info) => {
                return parseCalendarEvent(info)
            })
        });
        
        window.addEventListener("resize", (e)=>{
            const w = e.target as Window
            if (w.innerWidth < 600) {
                calendar.current.setOption('aspectRatio', 0.4);
            } else if (w.innerWidth < 960) {
                calendar.current.setOption('aspectRatio', 1.3);
            } else {
                calendar.current.setOption('aspectRatio', 1.8);
            }
            calendar.current.updateSize()
                       
        });
        calendar.current.render()   
    }, [])

    useEffect(() => {
        if (event.updateCalendar) {
            let info = event.eventInfo
            if (info) {
                calendar.current.addEvent(parseCalendarEvent(info))
                dispatch(clearNewEvent())   
            }
             
        }
    }, [event.updateCalendar])

    useEffect(() => {
        if (hasEdittedEvent.status && hasEdittedEvent.id !== undefined) {
            let oldEvent = calendar.current.getEventById( hasEdittedEvent.id )
            oldEvent.remove()
            let newEvent = events[hasEdittedEvent.id]
            calendar.current.addEvent({
                id: selectedEId,
                title: newEvent.students.length === 0 ? "未选定学生" : newEvent.students.length > 1 ? newEvent.students[0] + " 等" : newEvent.students[0],
                start: newEvent.year+'-'+newEvent.month+'-'+newEvent.date+'T'+newEvent.start+':00',
                end: newEvent.year+'-'+newEvent.month+'-'+newEvent.date+'T'+newEvent.end+':00',
            })
            calendar.current.refetchEvents()
            dispatch(updatedCalendarAfterEdit())
            
        }
    }, [hasEdittedEvent])

    useEffect(() => {
        if (hasDeletedEvent.status && hasDeletedEvent.id !== undefined) {
            let oldEvent = calendar.current.getEventById(  hasDeletedEvent.id )
            oldEvent.remove()
            calendar.current.refetchEvents()
            dispatch(updatedCalendarAfterDelete())
        }
    }, [hasDeletedEvent])

    return(
        <Container className={classes.root} >
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5">课程安排</Typography>
            </Toolbar>
            <div ref={container}></div>
            <CreateEvent />
            <EditEvent />
        </Container>
    )
}

export default Schedule