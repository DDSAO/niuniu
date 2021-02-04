import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { INotifications, IState, INotification } from './../../redux/types';
import { useSelector, useDispatch } from 'react-redux';
import  Box  from '@material-ui/core/Box';
import { readNotification } from './../../redux/actions';

interface Column {
  id: 'text' |  'timestamp';
  label: string;
  width?: string;
  minWidth?: number;
  align?: 'right'|'center'|'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'text', label: '消息内容', minWidth: 150, align:"left", width: "100%"},
  {
    id: 'timestamp',
    label: '时间',
    minWidth: 150,
    align: 'center',
    format: (timestamp:number) => {
        let date = new Date(timestamp)
        let timeString
        if (Date.now() - date.getTime() < 60 * 1000) {
            timeString = "刚刚"
        } else if (Date.now() - date.getTime() < 60 * 60 * 1000) {
            timeString = Math.round((Date.now() - date.getTime())/60000) + "分钟前"
        } else if (Date.now() - date.getTime() < 24 * 60 * 60 * 1000) {
            timeString = Math.round((Date.now() - date.getTime())/(60 * 60000)) + "小时前"
        } else {
            timeString = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 "+date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()
        }
        return timeString
    },
  },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    height: 600,
    minHeight: 200,
    maxHeight: 600,
  },
  isNew: {
    background: theme.palette.grey[50],
  }
}));

export default function NotificationTable(props: {searchWord: string, category: keyof INotifications}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const notifications = useSelector((state: IState) => state.notifications[props.category])
  const setting = useSelector((state: IState) => state.setting)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, wordBreak: "break-all", width: column.width ? column.width : "" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.filter((row: INotification)=> row.text.includes(props.searchWord)).reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              if (row.isNew && setting.autoReadNotification) setTimeout(() => dispatch(readNotification(row.id, props.category)), 100)
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} 
                className={row.isNew ? classes.isNew : ""}
                onClick={()=>dispatch(readNotification(row.id, props.category))}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, wordBreak: "normal" }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  
                </TableRow>
              );
            })}
            {notifications.length === 0 ? <TableRow><TableCell colSpan={2} align="center"><strong>消息列表为空</strong></TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="每页显示信息"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={notifications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
}
