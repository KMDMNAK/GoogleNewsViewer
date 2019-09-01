import * as React from 'react';
import {render} from 'react-dom'
import {ActionCommands} from '../action';

interface VscodeNameSpace{
    postMessage:any
}
declare let vscode:VscodeNameSpace;

export const activate =(vscode:VscodeNameSpace)=>{
    vscode=vscode;
    render(<Webview />,document.getElementById("webview"));
}

const emmit=(command:ActionCommands,value:any)=>{
    vscode.postMessage({
        command:command,
        value:value
    })
}

class AppOne extends React.Component<{one1:any,one2:any}>{
    render(){
        return(
            <div>
                <button onClick={()=>this.click()}>check</button>
                <p>{this.props.one1}</p>
                <p>{this.props.one2}</p>
            </div>
        );
    }
    click(){
    }
}

class AppTwo extends React.Component<{two1:any,two2:any}>{
    render(){
        return(
            <div>
            <p>{this.props.two1}</p>
            <p>{this.props.two2}</p>
            </div>
        );
    }
}

export default class Webview extends React.Component<{},any>{
    constructor(props:any){
        super(props)
        this.state={
            one1:"one1",
            one2:"one2",
            two1:"two1",
            two2:"two2",
        }
        this.registerEvent()
    }

    registerEvent(){
        window.addEventListener('message', event => {
            const message = event.data;
            this.stateChanger(message)
        })
    }
    stateChanger(message:any){

    }

    render(){
        return(
            <div>
                <AppOne one1={this.state.one1} one2={this.state.one2}></AppOne>
                <AppTwo two1={this.state.two1} two2={this.state.two2}></AppTwo>
            </div>
        )
    }
}

