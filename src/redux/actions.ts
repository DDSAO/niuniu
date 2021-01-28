
import { IAction, IEvent, IStudent,  INotifications, NotificationVariant } from './types';
import { useSnackbar } from 'notistack';


//faking data

import faker from 'faker'


export const initData = () : IAction => {
    var students: IStudent[] = []
    var studentNameList: string[] = []
    faker.locale = "zh_CN"
    for( let i = 0; i < 5; i++) {
        let name = faker.name.lastName() + faker.name.firstName()
        studentNameList.push(name)
        students[i] = {
            id: i,
            name: name,
            gender: faker.random.number({min:0, max:1, precision:1}),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            year: faker.random.number({min:1990, max:2010, precision:1}),
            month: faker.random.number({min:1, max:12, precision:1}),
            date: faker.random.number({min:1, max:31, precision:1}),
            pHour: faker.random.number({min:0, max:20, precision:1}),
            aHour: faker.random.number({min:0, max:20, precision:1}),
            pHourPast: faker.random.number({min:0, max:20, precision:1}),
            aHourPast: faker.random.number({min:0, max:20, precision:1}),
        }
    }
    return {
        type:"INIT_DATA",
        payload: {
            students: students,
            studentNameList: studentNameList,
        }
    }
}

//Schedule Page

export const toggleCreateEventDialog = () : IAction => ({
    type: "TOGGLE_CREATE_EVENT_DIALOG",
})

export const selectedDate = (date: Date) => ({
    type: "SELECTED_DATE",
    payload: { selectedDate: date }  
})

export const addNewEvent = (eventInfo: IEvent) => {
    return {
        type:"ADD_NEW_EVENT",
        payload: { eventInfo: eventInfo },
    }
}

export const clearNewEvent = (): IAction => ({
    type: "CLEAR_NEW_EVENT"
})

export const toggleEditEventDialog = (): IAction => ({
    type: "TOGGLE_EDIT_EVENT_DIALOG",
})

export const selectEvent = (eId: number): IAction => ({
    type: "SELECT_EVENT",
    payload: {eId: eId},
})

export const saveEdittedEvent = (eventInfo: IEvent): IAction => {

    return {
        type:"SAVE_EDITTED_EVENT",
        payload: {eventInfo: eventInfo},
    }
}

export const clearSelectedEvent = (): IAction => ({
    type: "CLEAR_EDIT_EVENT"
})

export const updateCalendarAfterEdit = (id: number): IAction => ({
    type: "UPDATE_CALENDAR_AFTER_EDIT",
    payload: {id: id},
})

export const updatedCalendarAfterEdit = (): IAction => ({
    type: "UPDATED_CALENDAR_AFTER_EDIT"
})

export const updateEventDate = (id: number, year: number, month: number, date: number): IAction => {
    return {
        type: "UPDATE_EVENT_DATE",
        payload: {
            id: id,
            year: year,
            month: month,
            date: date
        }
    }
}

export const deleteEventById = (id: number): IAction => ({
    type: "DELETE_EVENT_BY_ID",
    payload: {
        id: id
    }
})

export const updateCalendarAfterDelete = (id: number): IAction => ({
    type: "UPDATE_CALENDAR_AFTER_DELETE",
    payload: {id: id},
})

export const updatedCalendarAfterDelete = (): IAction => ({
    type: "UPDATED_CALENDAR_AFTER_DELETE"
})

//notification
export const addNotification = 
    (text: string, category: keyof INotifications, variant?: NotificationVariant)
        : IAction & {payload: {category: keyof INotifications, variant?: NotificationVariant}} => {
    return {
        type: "ADD_NOTIFICATION",
        payload: {
            id: faker.random.number({min:1, max:999999}),
            variant: variant,
            category: category,
            text: text,
            timestamp: Date.now()
        }
    }
}

export const readNotification = (id: number, category: keyof INotifications): IAction => ({
    type: "READ_NOTIFICATION",
    payload: {
        id: id,
        category: category,
    }
})

export const toggleAutoRead = (): IAction => ({
    type: "TOGGLE_AUTO_READ"
})

export const toggleCounting = (): IAction => ({
    type: "TOGGLE_COUNTING",
})

export const resetCounting = (): IAction => ({
    type: "RESET_COUNTING"
})
export const clearedCounter = (): IAction => ({
    type: "CLEARED_COUNTER"
})


