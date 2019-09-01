import Store from '../store/store'
import WebViewStore from '../store/webviewstore';
import PaletteStore from '../store/palettestore'

import { ACTIVE_COMMANDS } from '../config';
import { ActionContent, ActionCommands } from '../action'
import { EventEmitter } from 'events';
import * as vscode from 'vscode';


export default class Dispatch {
    event: EventEmitter = new EventEmitter();
    vscodeContext: vscode.ExtensionContext;
    stores: { [key: string]: Store };
    palettestore: PaletteStore = new PaletteStore(this, "PALETTE", this.vscodeContext);
    webviewstore: WebViewStore = new WebViewStore(this, "");
    
    constructor(vscodeContext: vscode.ExtensionContext) {
        this.vscodeContext = vscodeContext;
        this.stores = { "PALETTE":};
    }

    activate() {

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