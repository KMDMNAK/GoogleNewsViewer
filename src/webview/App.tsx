import * as React from 'react';
import { render } from 'react-dom';
import { REACT_CONTAINER_TAGNAME } from '../config'

interface VscodeNameSpace {
    postMessage: any;
}
declare let vscode: VscodeNameSpace;

export const activate = (vscode: VscodeNameSpace) => {
    vscode = vscode;
    render(<WebView />, document.getElementById(REACT_CONTAINER_TAGNAME));
}

class Key extends React.Component<{ key: string }>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>{this.props.key}</div>
        );
    }
}

class Article extends React.Component<{ articledatas: any[] }>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            this.props.articledatas.map((each_article) => {
                <li>{each_article.title}</li>
            })
        );
    }
}

class WebView extends React.Component<{}, { key: string, articledatas: any[] }>{
    constructor(props?: any) {
        super(props)
        this.state = {
            key: "",
            articledatas: []
        }

        window.addEventListener('message', event => {
            const message = event.data; // The JSON data our extension sent
            this.setState({
                key: message.key,
                articledatas:message.articledatas
            })
        });

    }

    render() {
        return (
            <div>
                <Key key={this.state.key} />
                <Article articledatas={this.state.articledatas} />
            </div>
        );
    }
}