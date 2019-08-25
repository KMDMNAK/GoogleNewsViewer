import * as vscode from 'vscode'
import { GoogleNewsCommands } from './command';

export interface PickInterface{
    showList: vscode.QuickPickItem[];
    otherOptions: any;
}

export default class ParetteModel{
    onTopicSearch() {
        vscode.window.showInformationMessage("onTopicSearch");
        const pickItems = {
            showList: [
                { label: 'World', description: 'search World news in google news',command:GoogleNewsCommands.searchTopicWorld },
                { label: 'Business', description: 'search Business news in google news' ,command:GoogleNewsCommands.searchTopicBussiness},
                { label: 'Nation', description: 'search Nation news in google news' ,command:GoogleNewsCommands.searchTopicNation},
                { label: 'Technology', description: 'search Technology news in google news' ,command:GoogleNewsCommands.searchTopicTechnology},
                { label: 'Entertainment', description: 'search Entertainment news in google news' ,command:GoogleNewsCommands.searchTopicEntertainment},
                { label: 'Sports', description: 'search Sports news in google news' ,command:GoogleNewsCommands.searchTopicSports},
                { label: 'Science', description: 'search Science news in google news' ,command:GoogleNewsCommands.searchTopicScience},
                { label: 'Health', description: 'search Health news in google news' ,command:GoogleNewsCommands.searchTopicHealth}
            ], otherOptions: { matchOnDescription: true, placeHolder: 'Select a Task' }
        };
        return pickItems;
    }
}