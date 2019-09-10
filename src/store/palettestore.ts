import * as vscode from 'vscode';
import Dispatch from '../dispatcher/dispatch'
import Store from './store'
import { ActionCommands, ActionContent } from '../action';

const pickItems = {
    showList: [
        { label: 'WORLD', description: 'search World news in google news', commandName: ActionCommands.searchTopic },
        { label: 'BUSINESS', description: 'search Business news in google news', commandName: ActionCommands.searchTopic },
        { label: 'NATION', description: 'search Nation news in google news', commandName: ActionCommands.searchTopic },
        { label: 'TECHNOLOGY', description: 'search Technology news in google news', commandName: ActionCommands.searchTopic },
        { label: 'ENTERTAINMENT', description: 'search Entertainment news in google news', commandName: ActionCommands.searchTopic },
        { label: 'SPORTS', description: 'search Sports news in google news', commandName: ActionCommands.searchTopic },
        { label: 'SCIENCE', description: 'search Science news in google news', commandName: ActionCommands.searchTopic },
        { label: 'HEALTH', description: 'search Health news in google news', commandName: ActionCommands.searchTopic }
    ], otherOptions: { matchOnDescription: true, placeHolder: 'Select a Task' }
};

export default class PaletteStore extends Store {
    vscodeContext: vscode.ExtensionContext;
    constructor(dispatcher: Dispatch, key: string, vscodeContext: vscode.ExtensionContext) {
        super(dispatcher);
        this.vscodeContext = vscodeContext;
        if(vscodeContext===undefined){
            vscode.window.showInformationMessage("context is undefined!!")
        }
        this.activate();
    }
    activate() {
        //register search query
        const viewSearchQueryAction: ActionContent = {
            commandName: ActionCommands.viewSearchQuery,
        }
        this.registerVscodeCommand(viewSearchQueryAction, (data: ActionContent) => {
            vscode.window.showInputBox({
                placeHolder: 'Search Query',
                prompt: 'Tip: input a Query'
            }).then((value) => {
                const action: ActionContent = {
                    commandName: ActionCommands.searchQuery,
                    key: ActionCommands.searchQuery + `.${value}`,
                    value: value
                }
                this.dispatcher.dispatch(action);
            });
        });

        // register vscode palette geo search
        const viewSearchGeoAction: ActionContent = {
            commandName: ActionCommands.viewSearchGeo,
        }
        this.registerVscodeCommand(viewSearchGeoAction, (data: ActionContent) => {
            vscode.window.showInputBox({
                placeHolder: 'Search Geo',
                prompt: 'Tip: input a name of city or country'
            }).then((value) => {
                const action: ActionContent = {
                    commandName: ActionCommands.searchGeo,
                    key: ActionCommands.searchGeo + `.${value}`,
                    value: value
                }
                this.dispatcher.dispatch(action)
            });
        });

        // register search topic
        const viewSearchTopicAction: ActionContent = {
            commandName: ActionCommands.viewSearchTopic,
        }
        this.registerVscodeCommand(viewSearchTopicAction, (data: ActionContent) => {
            vscode.window.showQuickPick(pickItems.showList, pickItems.otherOptions).then((returnObject: any) => {
                const action: ActionContent = {
                    commandName: ActionCommands.searchTopic,
                    key: ActionCommands.searchTopic + `.${returnObject.label}`,
                    value: returnObject.label
                }
                this.dispatcher.dispatch(action);
            })
        })
    }

    registerVscodeCommand(action: ActionContent, callback: any) {//固定されたactioncontent
        this.vscodeContext.subscriptions.push(
            vscode.commands.registerCommand(action.commandName, () => {
                this.dispatcher.dispatch(action);
            })
        );
        this.dispatcher.register(action.commandName, callback);
    }
}
