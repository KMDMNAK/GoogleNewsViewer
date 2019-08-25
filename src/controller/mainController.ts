import * as vscode from 'vscode';
import * as events from 'events';
import ParetteView from '../view/paretteview';
import ParetteModel from '../model/parettemodel';
import GoogleNews from '../model/googlenews';
import UrlRouter from '../model/urlrouter';
import WebViewPanel from '../view/webview';
import { GoogleNewsCommands } from '../model/command';

enum CommandPaletteStrings {
    geoSearch = "googlenews.geo",
    topicSearch = "googlenews.topic",
    querySearch = "googlenews.query",
    detailSearch = "googlenews.detail"
}

class CommandHandler implements vscode.Disposable {
    event: events.EventEmitter = new events.EventEmitter();
    vscodeContext: vscode.ExtensionContext;
    parettemodel = new ParetteModel();
    paretteview = new ParetteView();
    googlenews = new GoogleNews();
    webviewpanels: vscode.WebviewPanel[] = [];

    constructor(vscodeContext: vscode.ExtensionContext) {
        this.vscodeContext = vscodeContext;
    }

    addCommand(
        command_string: CommandPaletteStrings) {
        const this_temp = this;
        this.vscodeContext.subscriptions.push(
            vscode.commands.registerCommand(command_string, () => {
                this_temp.event.emit(command_string);
            }));
        this.eventRouter(command_string);
    }

    executeTopicSearch() {
        vscode.window.showInformationMessage("GN:1")
        vscode.window.showInformationMessage("Hello Topic Search!!");
        try {
            var topic_list = this.parettemodel.onTopicSearch();
            this.paretteview.showPick(topic_list).then((value) => {
                vscode.window.showInformationMessage(value.command);
                var urlrouter = new UrlRouter(value.command);
                this.executeShowPanel(urlrouter);
            }, error => {
                vscode.window.showErrorMessage('error in executeTopicSearch: ' + error);
            });
        } catch (err) {
            vscode.window.showInformationMessage(err);
        }
    }

    executeGeoSearch() {
        vscode.window.showInputBox({
            placeHolder: 'Search Geo',
            prompt: 'Tip: input a city or country name'
        }).then((value) => {
            var urlrouter = new UrlRouter(GoogleNewsCommands.searchGeo, value);
            this.executeShowPanel(urlrouter);
        });

        vscode.window.showInformationMessage("Hello Geo Search!!");
    }
    executeQuerySearch() {
        vscode.window.showInputBox({
            placeHolder: 'Search Query',
            prompt: 'Tip: input word you want to search'
        }).then((value) => {
            var urlrouter = new UrlRouter(GoogleNewsCommands.searchQuery, value);
            this.executeShowPanel(urlrouter);
        });
        vscode.window.showInformationMessage("Hello Query Search!!");
    }
    executeDetailSearch() {
        vscode.window.showInformationMessage("Hello Detail Search!!");
    }

    executeShowPanel(urlrouter: UrlRouter) {
        var url = urlrouter.startRouting();
        vscode.window.showInformationMessage(url);
        this.googlenews.getContent(url).then((items) => {
            console.log("in panelshow");
            console.log(items);
            var data = { items: items };
            var webviewpanel_const = new WebViewPanel();
            vscode.window.showInformationMessage("Hello executeShowPanel!");
            webviewpanel_const.getSearchTopicPanel(this.vscodeContext, data).then((html) => {
                var pushed_item: vscode.WebviewPanel = webviewpanel_const.getWebViewPanel(`${urlrouter.value}`, html);
                pushed_item.reveal()/*(vscode.ViewColumn.Beside, false);*/
                this.webviewpanels.push(pushed_item);
            });
        }, err => {
            vscode.window.showInformationMessage(err);
        });

    }
    eventRouter(inputCommand: CommandPaletteStrings) {
        switch (inputCommand) {
            case CommandPaletteStrings.geoSearch:
                this.event.on(inputCommand, () => { this.executeGeoSearch(); });
                break;
            case CommandPaletteStrings.topicSearch:
                this.event.on(inputCommand, () => { this.executeTopicSearch(); });
                break;
            case CommandPaletteStrings.querySearch:
                this.event.on(inputCommand, () => { this.executeQuerySearch(); });
                break;
            case CommandPaletteStrings.detailSearch:
                this.event.on(inputCommand, () => { this.executeDetailSearch(); });
                break;
        }
    }
    registerComands() {
        Object.entries(CommandPaletteStrings).forEach(([key, value]) => {
            console.log(value);
            this.addCommand(value);
        });
    }
    dispose() {
        this.webviewpanels.forEach((element) => {
            element.dispose()
        })
    }
}


export default class MainController  implements vscode.Disposable{
    vscodeContext: vscode.ExtensionContext;
    commandhandler: CommandHandler;

    constructor(vscodeContext: vscode.ExtensionContext) {
        
        this.vscodeContext = vscodeContext;
        this.commandhandler = new CommandHandler(this.vscodeContext);
    }

    activate() {
        console.log("activated maincontroller");
        this.commandhandler.registerComands();
    }
    dispose() {
        this.commandhandler.dispose();
    }
}