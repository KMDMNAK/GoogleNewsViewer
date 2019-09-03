import * as React from 'react';
import { useState } from 'react'
import { render } from 'react-dom';
import { REACT_CONTAINER_TAGNAME } from '../config'
//import { DateTimePicker ,MuiPickersUtilsProvider} from "@material-ui/pickers";
//<DateTimePicker value={selectedDate} onChange={handleDateChange}></DateTimePicker>
//import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment'
/*
<MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>
*/
const useStyles = makeStyles(theme => ({
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

const DateAndTimePickers = () => {
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
}

interface VscodeNameSpace {
    postMessage: any;
    window: any;
}
declare var vscode: VscodeNameSpace;

export const activate = (vscode: VscodeNameSpace) => {
    vscode = vscode;
    render(<WebView />, document.getElementById(REACT_CONTAINER_TAGNAME));
};

class Key extends React.Component<{ key: string }>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.key}
            </div>
        );
    }
}

class Article extends React.Component<{ articledatas: any[] }>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <style>
                    {`
                    .article {
                        padding: 10px
                    }
                    .title {
                        font-size: 20px
                    }
                `}
                </style>
                {this.props.articledatas.map((each_article) =>
                    <div className="article">
                        <a className="title" href={each_article.link} >{each_article.title}</a>
                        <div>
                            <span>{each_article.pubDate}*</span>
                            {(() => {
                                if (each_article.source && each_article.source._) {
                                    return <span>{each_article.source._}</span>;
                                }
                            })()}
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

const Panel = () => {
    const style: React.CSSProperties = {
        position: "sticky",
        top: 0
    };
    const [selectedDate, handleDateChange]: any[] = useState(new Date());
    return (
        <nav id="controller" style={style}>
            <DateAndTimePickers />
            <input type="text" />
        </nav>
    );
};

class WebView extends React.Component<{}, { key: string, articledatas: any[] }>{
    constructor(props?: any) {
        super(props);
        this.state = {
            key: "default",
            articledatas: [{ title: "default" }]
        }

        window.addEventListener('message', event => {
            const message = event.data; // The JSON data our extension sent
            this.setState({
                key: message.key,
                articledatas: message.articledatas
            })
        });
    }

    render() {
        return (
            <div>
                <h1>HELLO REACT!</h1>
                <Key key={this.state.key} />
                <div>
                    <Panel />
                    <Article articledatas={this.state.articledatas} />
                </div>
            </div>
        );
    }
}