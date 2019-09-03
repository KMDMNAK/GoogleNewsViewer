import * as vscode from 'vscode'
import { JSFILE_URI, VIEW_NAME_SPACE, REACT_CONTAINER_TAGNAME } from '../config'
import Store from './store'
import Dispatch from '../dispatcher/dispatch'
import { ActionCommands, ActionContent } from '../action';
import * as path from 'path';

export default class WebViewStore extends Store {
    webviewpanel: vscode.WebviewPanel;

    key: string ;
    articleDatas: any;
    extensionPath: string;
    constructor(dispatcher: Dispatch, key: string, extensionPath: string) {
        super(dispatcher);
        this.extensionPath = extensionPath;
        this.webviewpanel = vscode.window.createWebviewPanel(
            'googlenews',
            key,
            { viewColumn: vscode.ViewColumn.Active },
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(extensionPath, "dist"))],
                retainContextWhenHidden:true
            }
        );
        this.key = key;
    }
    onDisplay() {
        // ホントはviewで行うべき
        this.webviewpanel.webview.onDidReceiveMessage(
            message => {
                this.dispatcher.dispatch({
                    commandName: message.commandName,
                    key: message.key,
                    value: message.value
                });
            }
        );
        console.log("in onDisplay")
        this.webviewpanel.webview.html = this.getWebviewHtmlTemplate(JSFILE_URI);
        console.log("reveal panel")
        this.webviewpanel.reveal();
        this.postViewDatas();
        
        this.webviewpanel.onDidDispose(() => {
            const action:ActionContent={
                key: this.key,
                commandName: ActionCommands.viewClose,
            }
            this.dispatcher.dispatch(action);
        });
        
    }
    postViewDatas() {
        if (this.webviewpanel.visible) {
            console.log("in postviewdatas")
            console.log(this.key)
            console.log(this.articleDatas[0])
            console.log(this.articleDatas[this.articleDatas.length-1])
            this.webviewpanel.webview.postMessage({
                key: this.key,
                articledatas: this.articleDatas
            });
        }
    }
    getWebviewHtmlTemplate(jsfileuri: string) {
        return (`
<html>
    <head></head>
    <body>
    <h1>Hello WebView!</h1>
        <div id="${REACT_CONTAINER_TAGNAME}"></div>
        <script src="${vscode.Uri.file(path.join(this.extensionPath, "dist", jsfileuri)).with({ scheme: 'vscode-resource' })}"></script>
        <script>
            ${VIEW_NAME_SPACE}.activate(acquireVsCodeApi())
        </script>
        <style>
            body.vscode-light {
                color: black;
            }
            body.vscode-dark {
                color: white;
            }
            body.vscode-high-contrast {
                color: red;
                }
        </style>
    </body>
</html>`)
    }
}

