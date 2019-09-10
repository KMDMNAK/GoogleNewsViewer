import * as vscode from 'vscode'
import { JSFILE_URI, VIEW_NAME_SPACE, REACT_CONTAINER_TAGNAME } from '../config'
import Store from './store'
import Dispatch from '../dispatcher/dispatch'
import { ActionCommands, ActionContent } from '../action';
import * as path from 'path';

export default class WebViewStore extends Store {
    webviewpanel: vscode.WebviewPanel;
    action_key: string="";
    store_key: string ;
    articleDatas: any;
    extensionPath: string;
    constructor(dispatcher: Dispatch, store_key: string, extensionPath: string) {
        super(dispatcher);
        this.store_key = store_key;
        this.extensionPath = extensionPath;
        this.webviewpanel = vscode.window.createWebviewPanel(
            'googlenews',
            this.action_key,
            { viewColumn: vscode.ViewColumn.Active },
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(extensionPath, "dist"))],
                retainContextWhenHidden:true
            }
        );
        this.webviewpanel.webview.onDidReceiveMessage(
            message => {
                console.log("get a message")
                if (message.commandName === "test") {
                    console.log("test")
                    console.log(message.value);
                    return;
                }
                this.dispatcher.dispatch({
                    commandName: message.commandName,
                    key: this.store_key,
                    value: message.value
                });
                
            }
        );
        this.webviewpanel.onDidDispose(() => {
            const action:ActionContent={
                key: this.store_key,
                commandName: ActionCommands.viewClose,
            }
            this.dispatcher.dispatch(action);
        });
        this.webviewpanel.webview.html = this.getWebviewHtmlTemplate(JSFILE_URI);
        this.webviewpanel.reveal();
        
    }
    updateData(articleDatas:any,action_key:string) {
        // ホントはviewで行うべき
        this.articleDatas = articleDatas;
        this.action_key = action_key;
        this.webviewpanel.title = action_key;
        this.postViewDatas();
    }
    postViewDatas() {
        if (this.webviewpanel.visible) {
            console.log("in postviewdatas")
            console.log(this.action_key)
            console.log(this.articleDatas[0])
            console.log(this.articleDatas[this.articleDatas.length-1])
            this.webviewpanel.webview.postMessage({
                action_key: this.action_key,
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
            let vscode=acquireVsCodeApi();
            ${VIEW_NAME_SPACE}.activate(vscode);
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

