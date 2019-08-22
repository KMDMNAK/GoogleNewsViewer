import * as ejs from 'ejs';
import * as vscode from 'vscode';

export default class WebViewPanel {
    getWebViewPanel(uri: string, html: string) {
        var panel = vscode.window.createWebviewPanel(
            'googlenews',
            uri,
            {
                viewColumn: vscode.ViewColumn.Beside,
                preserveFocus: true
            });
        panel.webview.html = html;
        return panel;
    }

    getSearchTopicPanel(context: vscode.ExtensionContext, data: any): Thenable<string> {
        var path = "src/view/articleList.ejs";
        return ejs.renderFile(context.asAbsolutePath(path), data);
    }
}