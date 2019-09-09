import * as React from 'react';
import { render } from 'react-dom';
import { REACT_CONTAINER_TAGNAME } from '../config'
import Key from './key';
import Navigation from './navigation';
import Article from './article';


export interface VscodeNameSpace {
    postMessage: any;
    window: any;
}
//export var vscode: VscodeNameSpace;
export const activate = (vscode1: VscodeNameSpace) => {
    const vscode = vscode1;
    //vscode.window.showInformationMessage("HEY!")
    render(<WebView vscode={vscode}/>, document.getElementById(REACT_CONTAINER_TAGNAME));
};

export default class WebView extends React.Component<{ vscode: VscodeNameSpace }, { action_key: string, articledatas: any[] }>{
    vscode: VscodeNameSpace;
    constructor(props?: any) {
        super(props);
        this.vscode = props.vscode;
        this.state = {
            action_key: "action default",
            articledatas: [{ title: "default" }]
        };

        window.addEventListener('message', event => {
            const message = event.data; // The JSON data our extension sent
            //vscode.window.showInformationMessage("get message")
            this.setState({
                action_key: message.action_key,
                articledatas: message.articledatas
            });
        });
    }

    render() {
        //this.vscode.window.showInformationMessage("rendered App")
        return (
            <div>
                <h1>HELLO REACT!</h1>
                <Key action_key={this.state.action_key} />
                <div>
                    <Navigation />
                    <Article articledatas={this.state.articledatas} vscode={this.vscode} />
                </div>
            </div>
        );
    }
}
//<Article articledatas={this.state.articledatas} vscode={vscode} />
//render(<WebView />, document.getElementById(REACT_CONTAINER_TAGNAME));