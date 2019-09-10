import * as vscode from 'vscode';

export default class GoogleNewsSettings {
    configuration: vscode.WorkspaceConfiguration
        = vscode.workspace.getConfiguration("googleNews");

    getLanguage(): string {
        return this.configuration.language;
    }

    constructor() {
        vscode.workspace.onDidChangeConfiguration(() => {
            this.configuration = vscode.workspace.getConfiguration("googleNews");
        });
    }
}