import * as ejs from 'ejs';
import * as vscode from 'vscode';

export default class WebViewPanel {
    getWebViewPanel(uri: string, html: string) {
        var panel:vscode.WebviewPanel = vscode.window.createWebviewPanel(
            'googlenews',
            uri,
            {
                viewColumn: vscode.ViewColumn.Active/*,
                preserveFocus: true*/
            });
        panel.webview.html = html;
        vscode.window.showInformationMessage("active of panel"+panel.active);
        return panel;
    }

    getSearchTopicPanel(context: vscode.ExtensionContext, data: any): Thenable<string> {
        var path = "dist/view/articleList.ejs";
        return ejs.renderFile(context.asAbsolutePath(path), data);
    }
}