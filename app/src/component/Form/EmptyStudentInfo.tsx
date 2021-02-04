import { Button, Card, Grid, Hidden, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: grey[100],
    },
    grid: {
        margin: "16px 0",
        display:"flex",
        justifyContent:"center",  
    },

    fullWidth: {
        width: "calc(100% - 64px)",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
        width: "200px",
    }
  }));



const EmptyStudentInfo = () => {
    const data = {}
    const classes = useStyles();
    const [name, setName] = useState("")
    const [nameMessage, setNameMessage] = useState( "请输入您的姓名")
    const [gender, setGender] = useState<number|undefined>(undefined);
    const [genderMessage, setGenderMessage] = useState("请输入您的性别")
    const [phone, setPhone] = useState("")
    const [phoneMessage, setPhoneMessage] = useState("请输入您的手机号码")
    const [email, setEmail] = useState("")
    const [emailMessage, setEmailMessage] = useState("请输入您的电子邮箱")
    const [address, setAddress] = useState("")
    const [addressMessage, setAddressMessage] = useState("请输入您的地址")
    const [year, setYear] = useState<number|undefined>(undefined)
    const [yearMessage, setYearMessage] = useState("请输入您的出生年份(xxxx)")
    const [month, setMonth] = useState<number|undefined>(undefined)
    const [monthMessage, setMonthMessage] = useState("请输入您的出生月份")
    const [date, setDate] = useState<number|undefined>(undefined)
    const [dateMessage, setDateMessage] = useState("请输入您的出生日期")

    const reset = () => {
        setName("")
        setGender(undefined)
        setPhone("")
        setEmail("")
        setAddress("")
        setYear(undefined)
        setMonth(undefined)
        setDate(undefined)
    }

    return(
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                    <TextField id="name" label="姓名" variant="filled" helperText={nameMessage}
                    onChange={(e)=>setName(e.target.value)} value={name}
                    className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                    <TextField
                    id="gender"
                    select
                    label="性别"
                    onChange={(e)=>setGender(parseInt(e.target.value))}
                    value={gender}
                    helperText={genderMessage}
                    variant="filled"
                    className={classes.fullWidth}
                    >
                        <MenuItem key="1" value="1">男生</MenuItem>
                        <MenuItem key="0" value="0">女生</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                    <TextField id="phone" label="手机" variant="filled" helperText={phoneMessage}
                    className={classes.fullWidth} onChange={(e)=>setPhone(e.target.value)} value={phone}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                    <TextField id="email" label="邮箱" variant="filled" helperText={emailMessage}
                    className={classes.fullWidth} onChange={(e)=>setEmail(e.target.value)} value={email}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                    <TextField id="address" label="地址" variant="filled" helperText={addressMessage}
                    className={classes.fullWidth} onChange={(e)=>setAddress(e.target.value)} value={address}/> 
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <TextField id="year" label="年" variant="filled" 
                    helperText={yearMessage} type="number" inputProps={{min:"1900", max:"2025"}} 
                    className={classes.fullWidth} onChange={(e)=>setYear(parseInt(e.target.value))} value={year}/> 
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <TextField id="month" label="月" variant="filled" 
                    helperText={monthMessage} type="number" inputProps={{min:"1", max:"12"}} 
                    className={classes.fullWidth} onChange={(e)=>setMonth(parseInt(e.target.value))} value={month}/>  
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <TextField id="day" label="日" variant="filled" 
                    helperText={dateMessage} type="number" inputProps={{min:"1", max:"31"}} 
                    className={classes.fullWidth} onChange={(e)=>setDate(parseInt(e.target.value))} value={date}/>
                </Grid>
                <Hidden only={["xs","md","lg","xl"]}><Grid item sm={6} className={classes.grid} /></Hidden>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <Button variant="contained" color="primary" onClick={()=>reset()}
                    className={classes.button}>放弃更改</Button>
                </Grid>
                <Hidden only={["xs","sm"]}><Grid item  md={4} className={classes.grid} /></Hidden>
                <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <Button variant="contained" color="primary" className={classes.button}>保存</Button>
                </Grid>        
            </Grid>
        </Card>
    )
}

export default EmptyStudentInfo