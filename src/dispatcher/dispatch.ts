import Store from '../store/store'
import WebViewStore from '../store/webviewstore';
import PaletteStore from '../store/palettestore'
import { router } from './urlrouter';
import GoogleNewsConnector from './googlenews';
import { ACTIVE_COMMANDS } from '../config';
import { ActionContent, ActionCommands } from '../action'
import { EventEmitter } from 'events';
import * as vscode from 'vscode';


export default class Dispatch {
    event: EventEmitter = new EventEmitter();
    vscodeContext: vscode.ExtensionContext;
    webviewstores: { [key: string]: WebViewStore }={};
    googlenewsconnector: GoogleNewsConnector = new GoogleNewsConnector();
    palettestore: PaletteStore;
    extensionPath: string;
    constructor(vscodeContext: vscode.ExtensionContext) {
        this.vscodeContext = vscodeContext;
        this.palettestore = new PaletteStore(this, "PALETTE", this.vscodeContext);
        this.extensionPath = vscodeContext.extensionPath;
    }

    activate() {
        vscode.window.showInformationMessage("in dipatch activate")
        this.registerSearchCommand(ActionCommands.searchTopic);
        this.registerSearchCommand(ActionCommands.searchGeo);
        this.registerSearchCommand(ActionCommands.searchQuery);
        this.register(ActionCommands.viewClose, (action: ActionContent) => {
            delete this.webviewstores[action.key as string];
        });
    }
    registerSearchCommand(commandName: ActionCommands) {
        this.register(
            commandName,
            (action: ActionContent) => {
                // storeの生成は後回し
                //const action_key = action.key;
                const action_key = "view one";
                if(action_key===undefined){
                    throw new Error("action.key is undefined");
                }
                let store = this.webviewstores[action_key];
                if (!store) {
                    console.log("new webviewpanel")
                    store=new WebViewStore(this,action_key,this.extensionPath);
                }
                console.log("action key is "+action_key)
                const url = router(action) as string;
                this.googlenewsconnector.getContent(url).then((article_array: any) => {
                    store.articleDatas = article_array;
                    store.onDisplay()
                    this.webviewstores[action_key] = store;
                });
            }
        )
    }
    register(commandName: ActionCommands, callback: any) {
        this.event.on(
            commandName,
            (data: ActionContent) => callback(data)
        );
    }

    dispatch(action: ActionContent) {
        this.event.emit(action.commandName, action)
    }
}