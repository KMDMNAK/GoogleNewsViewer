import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';

/*
<MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>
*/

export default class Navigation extends React.Component {
    render() {
        const style: React.CSSProperties = {
            position: "sticky",
            top: 0
        };
        //const [selectedDate, handleDateChange]: any[] = useState(new Date());
        return (
            <nav id="controller" style={style}>
                <DateAndTimePickers />
                <input type="text" />
            </nav>
        );
    }
}

export const DateAndTimePickers = () => {
    const classes = useStyles();
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue={moment().format('YYYY-MM-DDTHH:mm')}//"2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
    
};

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));