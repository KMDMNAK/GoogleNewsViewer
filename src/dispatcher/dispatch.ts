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
    palettestore=new PaletteStore(this, "PALETTE", this.vscodeContext)

    constructor(vscodeContext: vscode.ExtensionContext) {
        this.vscodeContext = vscodeContext;
    }

    activate() {
        vscode.window.showInformationMessage("in dipatch activate")
        this.registerSearchCommand(ActionCommands.searchTopic);
        this.registerSearchCommand(ActionCommands.searchGeo);
        this.registerSearchCommand(ActionCommands.searchQuery);
    }
    registerSearchCommand(commandName: ActionCommands) {
        this.register(
            commandName,
            (action: ActionContent) => {
                if(action.key===undefined){
                    throw new Error("action.key is undefined");
                }
                let store=this.webviewstores[action.key]
                if(!store){
                    store=new WebViewStore(this,action.key);
                }
                const url = router(action) as string;
                this.googlenewsconnector.getContent(url).then((article_array: any) => {
                    store.articleDatas=article_array
                });
                this.webviewstores[action.key]=store
            }
        )
    }
    register(commandName: ActionCommands, callback: any) {
        this.event.on(
            commandName,
            (data: ActionContent) => callback(data)
        )
    }

    dispatch(action: ActionContent) {
        this.event.emit(action.commandName, action)
    }

    
}