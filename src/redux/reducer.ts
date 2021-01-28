
import { NotificationImportantSharp } from '@material-ui/icons'
import { IAction, IStudent, IState, INotification, INotifications } from './types'

const initialState: Readonly<IState> = {
    showCreateEventDialog: false,
    currentEId: 0,
    selectedDate: null,
    newEvent: {updateCalendar: false},
    showEditEventDialog:false,
    selectedEId: null,
    hasEdittedEvent: {status: false},
    hasDeletedEvent: {status: false},
    allEvents: {},
    students: [],
    studentNameList: [],
    notifications: {
        student: [{id:0,text:"一条消息",timestamp:1,isNew:true}],
        schedule: [],
        courseHour: [],
        practice: []
    },
    setting: {
        autoReadNotification: true
    },
    courseCounter: {
        counting: true,
        shouldReset: false,
    }
}

const addNewEvent = (state: Readonly<IState>, action: IAction) : Readonly<IState> => {
    return {
        ...state, 
        newEvent:{
            updateCalendar: true, 
            eventInfo:action.payload.eventInfo
        },
        allEvents: {
            ...state.allEvents,
            [action.payload.eventInfo.id] : action.payload.eventInfo
        },
        currentEId: state.currentEId + 1
    }
}

const updateEventDate = (state: Readonly<IState>, action: IAction) : Readonly<IState> => {
    
    return {
        ...state, 
        allEvents: {
            ...state.allEvents, 
            [action.payload.id]:{
                ...state.allEvents[action.payload.id],
                year: action.payload.year,
                month: action.payload.month,
                date: action.payload.date
            }
        }
    }  
}

const deleteEventById = (state: Readonly<IState>, action: IAction) : Readonly<IState> => {
    const allEvents = state.allEvents
    delete allEvents[action.payload.id]
    return {
        ...state,
        allEvents: allEvents,
        
    }
}

const addNotification = (state: Readonly<IState>, action: IAction ) : Readonly<IState> => {
    let notification: INotification = {
        id: action.payload.id,
        text: action.payload.text,
        timestamp: action.payload.timestamp,
        isNew: true,
    }
    let category: keyof INotifications = action.payload.category
    let newNotifications: INotification[] = [...state.notifications[category], notification]
    
    return {
        ...state,
        notifications: {
            ...state.notifications,
            [category]: newNotifications,
        }
    }
}

const readNotification =  (state: Readonly<IState>, action: IAction ) : Readonly<IState> => {
    let category: keyof INotifications = action.payload.category
    let newNotifications = state.notifications[category].map((noti) => {
        if (noti.id === action.payload.id) {
            return {
                ...noti,
                isNew: false,
            }
        }
        return noti
    })
    return {
        ...state,
        notifications: {
            ...state.notifications,
            [category]: newNotifications
        }
    }
}

export const reducer = (state = initialState, action: IAction ): IState => {
    switch (action.type) {
        case "INIT_DATA": return {...state, students:action.payload.students, studentNameList: action.payload.studentNameList}

        case "TOGGLE_CREATE_EVENT_DIALOG": return {...state, showCreateEventDialog: ! state.showCreateEventDialog}
        case "SELECTED_DATE": return {...state, selectedDate: action.payload.selectedDate}
        case "ADD_NEW_EVENT": return addNewEvent(state, action)
        case "CLEAR_NEW_EVENT": return {...state, newEvent:{updateCalendar: false}}

        case "TOGGLE_EDIT_EVENT_DIALOG": return {...state, showEditEventDialog: ! state.showEditEventDialog}
        case "SAVE_EDITTED_EVENT": return {...state, allEvents: {...state.allEvents, [action.payload.eventInfo.id]: action.payload.eventInfo}}
        case "SELECT_EVENT": return {...state, selectedEId: action.payload.eId}
        case "CLEAR_EDIT_EVENT": return {...state, selectedEId: null}
        case "DELETE_EVENT_BY_ID": return deleteEventById(state, action)
        case "UPDATE_CALENDAR_AFTER_DELETE": return {...state, hasDeletedEvent: {status: true, id: action.payload.id}}
        case "UPDATED_CALENDAR_AFTER_DELETE": return {...state, hasDeletedEvent: {status: false}}

        case "UPDATE_CALENDAR_AFTER_EDIT": return {...state, hasEdittedEvent: {status: true, id: action.payload.id}}
        case "UPDATED_CALENDAR_AFTER_EDIT": return {...state, hasEdittedEvent: {status: false}}
        
        case "UPDATE_EVENT_DATE": return updateEventDate(state, action)

        case "ADD_NOTIFICATION": return addNotification(state, action)
        case "READ_NOTIFICATION": return readNotification(state, action)

        //setting
        case "TOGGLE_AUTO_READ": return {...state, setting: {...state.setting, autoReadNotification: ! state.setting.autoReadNotification}}

        //course
        case "TOGGLE_COUNTING": return {...state, courseCounter: {...state.courseCounter, counting: ! state.courseCounter.counting}}
        case "RESET_COUNTING": return {...state, courseCounter: {...state.courseCounter, shouldReset: true}}
        case "CLEARED_COUNTER": return {...state, courseCounter: {...state.courseCounter, shouldReset: false}}
        
        default: return state
    }
}