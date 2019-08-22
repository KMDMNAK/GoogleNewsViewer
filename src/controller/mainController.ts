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

class CommandHandler {
    event: events.EventEmitter = new events.EventEmitter();
    vscodeContext: vscode.ExtensionContext;
    parettemodel = new ParetteModel();
    paretteview = new ParetteView();
    googlenews = new GoogleNews();

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
        vscode.window.showInformationMessage("Hello Topic Search!!");
        var topic_list = this.parettemodel.onTopicSearch();
        this.paretteview.showPick(topic_list).then((value) => {
            console.log(value.command);
            var urlrouter = new UrlRouter(value.command);
            this.executeShowPanel(urlrouter);
        }, error => {
            vscode.window.showErrorMessage('error in executeTopicSearch: ' + error);
        });
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
        console.log(url);
        this.googlenews.getContent(url).then((items) => {
            console.log("in panelshow");
            console.log(items);
            var data = { items: items };
            var webviewpanel = new WebViewPanel();
            webviewpanel.getSearchTopicPanel(this.vscodeContext, data).then((html) => {
                webviewpanel.getWebViewPanel(`${urlrouter.value}`, html).reveal(vscode.ViewColumn.Beside, false);
            });
        })

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
}


export default class MainController {
    vscodeContext: vscode.ExtensionContext;

    constructor(vscodeContext: vscode.ExtensionContext) {
        this.vscodeContext = vscodeContext;
    }

    activate() {
        console.log("activated maincontroller");
        var commandhandler = new CommandHandler(this.vscodeContext);
        commandhandler.registerComands();
    }
}