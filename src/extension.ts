import * as vscode from 'vscode';
import Dispatch from './dispatcher/dispatch'
import { ACTIVE_COMMANDS } from './config'
import { ActionCommands } from './action';
export const activate = (vscodeContext: vscode.ExtensionContext) => {
    console.log('Congratulations, your extension "google-news-reader" is now active!');
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!');
    });
    vscodeContext.subscriptions.push(disposable);
    const registerVscodeCommand = (commandName: ActionCommands) => {
        vscodeContext.subscriptions.push(
            vscode.commands.registerCommand(commandName, () => {
                dispatcher.register(commandName, {})
            })
            //this.event.on(inputCommand, () => { this.executeGeoSearch(); });
        )
    };

    const dispatcher = new Dispatch(vscodeContext);
    dispatcher.activate();
}

export const deactivate = () => { }
