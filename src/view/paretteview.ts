import * as vscode from 'vscode';
import { PickInterface } from '../model/parettemodel';

export default class ParetteView {
    constructor() { }
    showPick(pickObject: PickInterface): Thenable<any> {
        console.log("showpick in view");
        return vscode.window.showQuickPick(pickObject.showList, pickObject.otherOptions)
    }
}
