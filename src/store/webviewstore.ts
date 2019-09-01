import * as vscode from 'vscode'
import { jsfileuri } from '../config'
import Store from './store'
import Dispatch from '../dispatcher/dispatch'
import { ActionCommands, ActionContent } from '../action';
import { router } from './urlrouter';
import GoogleNewsConnector from './googlenews';

export default class WebViewStore extends Store {
    webviewpanel: vscode.WebviewPanel;
    googlenewsconnector: GoogleNewsConnector = new GoogleNewsConnector();
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

        this.registerCommand(ActionCommands.searchTopic);
        this.registerCommand(ActionCommands.searchGeo);
        this.registerCommand(ActionCommands.searchQuery);
    }

    postViewDatas() {
        if (this.webviewpanel.visible) {
            this.webviewpanel.webview.postMessage({
                key: this.key,
                articleDatas: this.articleDatas
            });
        }
    }

    registerCommand(commandName: ActionCommands) {
        this.dispatcher.register(
            commandName,
            (action: ActionContent) => {
                const url = router(action) as string;
                this.googlenewsconnector.getContent(url).then((article_array: any) => {
                    this.articleDatas = article_array;
                    this.key = action.key as string;
                    this.postViewDatas();
                });
            }
        )
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