import * as vscode from 'vscode'
import { jsfileuri } from '../config'
import Store from './store'
import Dispatch from '../dispatcher/dispatch'
import { ActionCommands, ActionContent } from '../action';


export default class WebViewStore extends Store {
    webviewpanel: vscode.WebviewPanel;
    
    key: string ="" ;
    articleDatas: any;

    constructor(dispatcher: Dispatch, key: string) {
        super(dispatcher);

        this.webviewpanel = vscode.window.createWebviewPanel(
            'googlenews',
            'googlenews_test',
            { viewColumn: vscode.ViewColumn.Active },
            { enableScripts: true }
        );
        // ホントはviewで行うべき
        this.webviewpanel.webview.onDidReceiveMessage(
            message => {
                this.dispatcher.dispatch({
                    commandName: message.commandName,
                    key: message.key,
                    value: message.value
                });
            });
        this.webviewpanel.webview.html = getWebviewHtmlTemplate(jsfileuri);
        this.webviewpanel.reveal();
    }

    postViewDatas() {
        if (this.webviewpanel.visible) {
            this.webviewpanel.webview.postMessage({
                key: this.key,
                articleDatas: this.articleDatas
            });
        }
    }

    
}

const getWebviewHtmlTemplate = (jsfileuri: string) => `
<html>
    <head></head>
    <body>
        <div id="webview"></div>
        <script src="${jsfileuri}"></script>
    </body>
</html>`