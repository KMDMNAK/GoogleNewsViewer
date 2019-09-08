import * as React from 'react';

import { render } from 'react-dom';
import { REACT_CONTAINER_TAGNAME } from '../config'
import Key from './key';
import Navigation from './navigation';
import Article from './article';
/*
interface VscodeNameSpace {
    postMessage: any;
    window: any;
}
declare var vscode: VscodeNameSpace;
export const activate = (vscode: VscodeNameSpace) => {
    vscode = vscode;
    render(<WebView />, document.getElementById(REACT_CONTAINER_TAGNAME));
};
*/

export default class WebView extends React.Component<{}, { key: string, articledatas: any[] }>{
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
                    <Navigation />
                    <Article articledatas={this.state.articledatas} />
                </div>
            </div>
        );
    }
}

