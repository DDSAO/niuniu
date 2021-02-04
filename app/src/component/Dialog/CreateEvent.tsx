import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl  from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCreateEventDialog, addNewEvent, addNotification } from '../../redux/actions';
import { Typography, TextField, Container, FilledInput, Button, RadioGroup, Radio, Collapse } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import { grey } from '@material-ui/core/colors';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { IState, NotificationVariant } from './../../redux/types';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
		root: {
				flexGrow: 1,
		},
		inputBox: {
				width: "100px",
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
				'& input': {
						textAlign:"right",
				}
		},
		datePicker: {
			width: "150px",
			margin: theme.spacing(1),
				'& input': {
						textAlign:"right",
				}
		},
		container: {
			width: "100%",
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent:"space-around",
			alignItems:"center",
			[theme.breakpoints.down('xs')] :{
				width: "300px",
			}
		},
		studentsSelection: {
			margin: theme.spacing(1),
 
			width:350,
			[theme.breakpoints.down('xs')] :{
				width: "200px",
			}
		},
		chips: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
		flexRow: {
			display:"flex",
			justifyContent: "flex-start",
			flexDirection:"row",
			alignItems: "center,"
		},
		addSingleStudent: {
			display:"flex",
			justifyContent: "center",
			flexDirection:"row",
			alignItems: "flex-end"
		},
		title: {
			'& h2': {
				display:"flex",
				alignItems:"center",
			}
		},
		paper: {
			padding: theme.spacing(2),
			marginBottom: theme.spacing(1),
			background: grey[100],
		}
		
}))

type message = {
	year?: string,
	month?: string,
	date?: string,
	start?: string,
	end?: string,
	routineWeeks?: string,
}

export default function CreateEvent() {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles()

	const open = useSelector((state: IState) => state.showCreateEventDialog)
	const selectedDate = useSelector((state: IState) => state.selectedDate)
	const eId = useSelector((state: IState) => state.currentEId)
	const names = useSelector((state: IState) => state.studentNameList)
	const dispatch = useDispatch()

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
    };
    
    const { enqueueSnackbar } = useSnackbar()


	const [year, setYear] = useState<number>(-1)
	const [month, setMonth] = useState<number>(-1)
	const [date, setDate] = useState<number>(-1)
	const [start, setStart] = useState("07:30")
	const [end, setEnd] = useState("09:30")
	const [type, setType] = useState("piano")
	const [newNames, setNewNames] = useState<string[]>([])
	const [students, setStudents] = useState<string[]>([])
	const [newStudent, setNewStudent] = useState("")
	const [routine, setRoutine] = useState(false)
	const [routineWeeks, setRoutineWeeks] = useState(10)
    const [errorMessage, setErrorMessage] = useState<message>({})
    
    const sendNotification = (text:string, variant?: NotificationVariant):void => {
        enqueueSnackbar(text, {variant: variant})
        dispatch(addNotification(text, "schedule", variant))
    }

	const reset = () => {
		setYear(-1)
		setMonth(-1)
		setDate(-1)
		setStart("07:30")
		setEnd("09:30")
		setType("piano")
		setStudents([])
		setRoutine(false)
		setRoutineWeeks(10)
	}
	const verify = () => {
		let hasError = false
		let newMessage: message = {
			year: "",
			month: "",
			date: "",
			start: "",
			end: "",
			routineWeeks: "",
		}
		if (year === undefined) {
			newMessage.year = "年份不能为空"
			hasError = true
		} else if (year < 1990) {
			newMessage.year = "年份格式为xxxx"
			hasError = true
		}
		if (month === undefined) {
			newMessage.month = "月份不能为空"
			hasError = true
		} else if (month < 1 || month > 12) {
			newMessage.month = "月份错误"
			hasError = true
		}
		if (date === undefined) {
			newMessage.month = "日期不能为空"
			hasError = true
		} else if (date < 1 || date > 31) {
			newMessage.month = "日期错误"

		}
		if (year && month && date && new Date(year+"/"+month+"/"+date+" "+start) > new Date(year+"/"+month+"/"+date+" "+end)) {
			newMessage.start = "开始时间大于结束时间"
			newMessage.end = "结束时间小于开始时间"
			hasError = true
		}  
		if (routineWeeks < 1) {
			newMessage.routineWeeks = "课程至少持续1周"
			hasError = true
		}
		if (hasError) {
			setErrorMessage(newMessage)
			return false
		} else {
			return true
		}
	}

	useEffect(() => {
		if (selectedDate) {
				setYear(selectedDate.getFullYear())
				setMonth(selectedDate.getMonth() + 1)
				setDate(selectedDate.getDate())
		}   
	}, [selectedDate])

	return (
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={() => {
					setErrorMessage({})
					dispatch(toggleCreateEventDialog())}}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" className={classes.title}><PlaylistAddIcon />创建新课程</DialogTitle>
				<DialogContent>
					
					<Paper className={classes.paper}>
						<Typography variant="h6">日期</Typography> 
						<Container className={classes.container}>
							<TextField
								required
								label="年份"
								id="year"
								className={classes.inputBox}
								type="number"
								value={year}
								onChange={(e)=>setYear(parseInt(e.target.value))}
								error={errorMessage.year ? true : false}
								helperText={errorMessage.year ? errorMessage.year : ""}
								InputProps={{
									inputProps: {min: 1900},
									endAdornment: <InputAdornment position="end">年</InputAdornment>,
									style: {textAlign:"right"}
								}}
							/>
							<TextField
								required
								label="月份"
								id="month"
								className={classes.inputBox}
								type="number"
								value={month}
								onChange={(e)=>setMonth(parseInt(e.target.value))}
								error={errorMessage.month ? true : false}
								helperText={errorMessage.month ? errorMessage.month : ""}
								InputProps={{
									inputProps: {min: 1, max:12},
									endAdornment: <InputAdornment position="end">月</InputAdornment>,
									style: {textAlign:"right"}
								}}
							/>
							<TextField
								required
								label="日期"
								id="date"
								className={classes.inputBox}
								type="number"
								value={date}
								onChange={(e)=>setDate(parseInt(e.target.value))}
								aria-describedby="date"
								error={errorMessage.date ? true : false}
								helperText={errorMessage.date ? errorMessage.date : ""}
								InputProps={{
									inputProps: {min: 1, max:31},
									endAdornment: <InputAdornment position="end">日</InputAdornment>,
									style: {textAlign:"right"}
								}}
							/>
						</Container>
					</Paper>
					
					<Paper className={classes.paper}>
						<Typography variant="h6">时间</Typography> 
						<Container className={classes.container}>
						
						<form  noValidate>
							<TextField
								required
								id="start"
								label="课程开始时间"
								type="time"
								value={start}
								onChange={(e)=>setStart(e.target.value)}
								className={classes.datePicker}
								error={errorMessage.start ? true : false}
								helperText={errorMessage.start ? errorMessage.start : ""}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: 300, // 5 min
								}}

							/>
							<TextField
								required
								id="end"
								label="课程结束时间"
								type="time"
								value={end}
								onChange={(e)=>setEnd(e.target.value)}
								className={classes.datePicker}
								error={errorMessage.end ? true : false}
								helperText={errorMessage.end ? errorMessage.end : ""}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: 300, // 5 min
								}}
							/>
						</form>
						</Container>
					</Paper>
					<Paper className={classes.paper}>
						<Typography variant="h6">课程类别</Typography>
						<Container className={classes.container}>
							<FormControl component="fieldset">
								<RadioGroup row aria-label="type" name="type" value={type} onChange={(e)=>setType(e.target.value)}>
									<FormControlLabel value="piano" control={<Radio />} label="钢琴" className={classes.inputBox}/>
									<FormControlLabel value="artifact" control={<Radio />} label="手工" className={classes.inputBox}/>
									<FormControlLabel value="other" control={<Radio />} label="其他" className={classes.inputBox}/>
								</RadioGroup>
							</FormControl>
						</Container>
						
					</Paper>
					<Paper className={classes.paper}>
						<Typography variant="h6">学生</Typography>
						<Container className={classes.container}>   
							<FormControl className={classes.studentsSelection}>
								<InputLabel id="students-label">添加学生</InputLabel>
								<Select
									labelId="students-label"
									id="students-box"
									multiple
									displayEmpty={true}
									value={students}
									onChange={e => {if (Array.isArray(e.target.value)) setStudents(e.target.value)}}
									input={<Input id="select-multiple-chip" />}
									renderValue={(selected) => {
										if (Array.isArray(selected)) {
											return (
												<div className={classes.chips}>
													{selected.map((value) => (
														<Chip variant="outlined" key={value} label={value} className={classes.chips}
														//avatar={<Avatar src="https://picsum.photos/30" />}
														/>
													))}
												</div>
											)
										} else {
											return null
										}}}
									MenuProps={MenuProps}
								>
									{newNames ? newNames.map((name) => (
										<MenuItem key={name} value={name}>
											{name}
										</MenuItem>
									)) : null}
									{names.map((name) => (
										<MenuItem key={name} value={name}>
											{name}
										</MenuItem>
									))}
								</Select>
							</FormControl>   
							<Container className={classes.addSingleStudent}>
                                <Typography>未找到学生？</Typography>
								<TextField
									label="手动输入姓名"
									id="name"
									className={classes.inputBox}
									type="text"
									value={newStudent}
									onChange={(e)=>setNewStudent(e.target.value)}
									aria-describedby="date"
									InputProps={{
										style: {textAlign:"right"}
									}}
								/>
                                <Button 
                                variant="outlined"
                                color="primary"
                                onClick={()=> {
									if (newStudent !== "") {
										let oldNewNames = newNames
										oldNewNames.push(newStudent)
										setNewNames(oldNewNames)
										setNewStudent("")
									}
								}}>临时添加入名单</Button>
							</Container> 
						</Container>         
					</Paper>
					<Paper className={classes.paper}>
						<FormControlLabel
						value="end"
						control={<Switch color="primary" checked={routine} onChange={()=>setRoutine(! routine)}/>}
						label="设为常驻课程"
						labelPlacement="end"
						/>
						<Collapse in={routine}>
							<Fade in={routine}>
								<Container className={classes.container}>
									<TextField
									label="课程将持续"
									id="standard-start-adornment"
									className={classes.datePicker}
									type="number"
									value={routineWeeks}
									onChange={(e)=>setRoutineWeeks(parseInt(e.target.value))}
									error={errorMessage.routineWeeks ? true : false}
									helperText={errorMessage.routineWeeks ? errorMessage.routineWeeks : ""}
									InputProps={{
										inputProps: {min: 1},
										endAdornment: <InputAdornment position="end">周</InputAdornment>,
										style: {textAlign:"right"}
									}}/>
								</Container>
							</Fade>
						</Collapse>
						
					</Paper>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="secondary" 
					onClick={() => {
						reset()
						dispatch(toggleCreateEventDialog())
					}}>
						取消并清空
					</Button>
					<Button variant="contained" color="primary" onClick={() => {
						setErrorMessage({})
						if(verify() && year && month && date) {
							dispatch(addNewEvent({
								id: eId,
								year: year,
								month: month,
								date:date,
								start: start,
								end: end,
								students: students,
								routine: routine,
								routineWeeks: routineWeeks,
								type: type
                            }))
                            let typeC = ""
                            if (type === "piano") {
                                typeC = "钢琴"
                            } else if (type == "artifact") {
                                typeC = "手工"
                            }
                            sendNotification(`学生${students.join('，')}于${year}年${month}月${date}日 ${start}至${end}的${typeC}课已创建成功`, "success")
							reset()
							dispatch(toggleCreateEventDialog())
						}}} autoFocus>
						确认添加
					</Button>
				</DialogActions>
			</Dialog>
	);
}
