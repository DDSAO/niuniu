
export interface IAction {
    type: string,
    payload?: any 
}


export interface IStudent {
    id: number,
    name: string,
    gender: number,
    email: string,
    phone: string,
    address: string,
    year: number,
    month: number,
    date: number,
    pHour: number,
    aHour: number,
    pHourPast: number,
    aHourPast: number,
}

export interface IEvent {
    id: number,
    year: number,
    month: number,
    date: number,
    start: string,
    end: string,
    type: string,
    students: string[],
    routine: boolean,
    routineWeeks?: number,
}

export interface INotification {
    id: number,
    text: string,
    timestamp: number,
    isNew: boolean,
}


export interface INotifications {
    student: INotification[],
    schedule:  INotification[],
    courseHour:  INotification[],
    practice:  INotification[]
}

export enum NotificationKeys {
    student = 'student',
    schedule = 'schedule',
    courseHour = 'courseHour',
    practice = 'practice'
}

export type NotificationVariant = "success"|"error"|"warning"|"info";

export interface ISetting {
    autoReadNotification: boolean,
}

export type TwoDimensionData = {
    x: number,
    y: number
}

export interface ICounter {
    counting: boolean,
    shouldReset: boolean,
}


export interface IState {
    showCreateEventDialog: boolean,
    currentEId: number,
    selectedDate: Date|null,
    newEvent: {updateCalendar: boolean, eventInfo?: IEvent},
    showEditEventDialog: boolean,
    selectedEId: number|null,
    hasEdittedEvent: {
        status: boolean,
        id?: number
    }, //whether update calendar after editting
    hasDeletedEvent: {
        status: boolean,
        id?: number
    }, //whether update calendar after deleting
    allEvents: {[id: number]: IEvent},
    students: IStudent[],
    studentNameList: string[],
    notifications: INotifications,
    setting: ISetting,
    
    courseCounter: ICounter,
}




