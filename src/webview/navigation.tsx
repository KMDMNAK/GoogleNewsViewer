/// <reference path="./App.tsx" />

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import clsx from 'clsx';
import { ActionCommands, ActionContent } from '../action'

/*
<MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>
*/

//export default class Navigation extends React.Component {
const Navigation = () => {
    const classes = useStyles();
    const style: React.CSSProperties = {
        position: "sticky",
        top: 30
    };
    const [values, setValues] = React.useState({
        after: moment().format('YYYY-MM-DD'),
        before: moment().format('YYYY-MM-DD'),
        site:"",
        word:""
      });
    //const [selectedDate, handleDateChange]: any[] = useState(new Date());
    
    const handleChange = (name: string) => (event: any) => {
        
        setValues({ ...values, [name]: event.target.value });
    };
    const submit = () => {
        console.log(values)
        let query = ""
        if (values.word !== "") {
            query += values.word;
        }
        if (values.before !== "") {
            query += " before:" + values.before;
        }
        if (values.after !== "") {
            query += " after:" + values.after;
        }
        if (values.site !== "") {
            query += " site:" + values.site;
        }
        const action: ActionContent = {
            commandName:ActionCommands.searchQuery,
            value: query
        }
        vscode.postMessage(action)
        console.log(query);
    }
    return (
        <nav id="controller" style={style}>
            <style>{
                `
                    .clearfix:after{
                        content: "";
                        clear: both;
                        display: block;
                    }
                    `
            }
            </style>
            <form className={"clearfix " + classes.container} onSubmit={()=>submit()} noValidate>
                <div id="controller-date" style={{ float: "left" }}>
                    <div className="date-select" style={{ marginBottom: "10px" }}>
                        <DateAndTimePickers label="after" handleChange={handleChange}/>
                    </div>
                    <div className="date-select">
                        <DateAndTimePickers label="before" handleChange={handleChange}/>
                    </div>
                </div>
                <div id="word-input" style={{ float: "left", textAlign: "center" }}>
                    <WordInput label="word" styleClass={classes.wordInput} handleChange={handleChange}/>
                </div>
                <div id="site-input" style={{ textAlign: "center" }}>
                    <WordInput label="site" styleClass={classes.siteInput} handleChange={handleChange}/>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </nav>
    );
}

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
        height: 30,
    },
    wordInput: {
        width: 150,
        marginRight: 10
    },
    siteInput: {
        width: 150,
    },
    inputlabelroot: {
        color: "var(--vscode-editor-foreground)"
    },
    inputroot: {
        color: 'var(--vscode-editor-foreground)'
    },
    notched: {
        borderColor: "var(--vscode-settings-textInputBorder)"
    },
    dense: {
        marginTop: 19,
    }
}));
const WordInput = (props: any) => {
    const classes = useStyles();
    return (
        <TextField
            id="standard-dense"
            label={props.label}
            className={clsx(props.styleClass, classes.dense)}
            margin="dense"
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.inputlabelroot
                }
            }}
            variant="outlined"
            InputProps={{
                classes: {
                    root: classes.inputroot,
                    notchedOutline: classes.notched
                }
            }}
            onChange={props.handleChange(props.label)}
        />
    )
}
const DateAndTimePickers = (props: any) => {
    const classes = useStyles();
    return (
        <TextField
            id="datetime-local"
            label={props.label}
            type="date"
            defaultValue={moment().format('YYYY-MM-DD')}//"2017-05-24T10:30"
            className={classes.textField}
            variant="outlined"
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.inputlabelroot
                }
            }}
            InputProps={{
                classes: {
                    root: classes.inputroot,
                    notchedOutline: classes.notched
                }
            }}
            onChange={props.handleChange(props.label)}
        />
    );

};

export default Navigation;