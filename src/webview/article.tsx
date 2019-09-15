/// <reference path="./App.tsx" />

import * as React from 'react';
import { ActionCommands, ActionContent } from '../action';
//import { VscodeNameSpace } from './App'

//export default class Article extends React.Component<{ articledatas: any[], vscode: VscodeNameSpace }>{
export default class Article extends React.Component<{ articledatas: any[] }>{
    //vscode: VscodeNameSpace;
    constructor(props: any) {
        super(props);
        this.postData = this.postData.bind(this);
        //this.vscode.window.showInformationMessage("rendered article")
    }
    postData(url: string) {
        const action: ActionContent = {
            commandName: ActionCommands.searchQuery,
            value: `site:${url}`
        }
        //this.vscode.window.showInformationMessage("posted data")
        vscode.postMessage(action);
    }
    render() {
        return (
            <div id="articles">
                <style>
                    {`
                    #articles {
                        margin-left: 5%;
                        margin-right: 5%;
                    }
                    .article {
                        border-bottom: medium solid #ffffff;
                        padding: 4%;
                    }
            
                    .article-title {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 19px !important;
                        color:var(--vscode-list-hoverForeground)
                    }

                    .article-option{
                        margin-top:5px
                    }
                `}
                </style>
                {this.props.articledatas.map((each_article) =>
                    <div className="article">
                        <div className="article-title">
                            <a href={each_article.link} title={each_article.title}>{each_article.title}</a>
                        </div>
                        <div className="article-option">
                            {(() => {
                                if (each_article.source && each_article.source._) {
                                    return (
                                        <span className="media-name">
                                            <a href="" onClick={() => this.postData(each_article.source.$.url)}>
                                                {each_article.source._}
                                            </a>&ensp;&ensp;
                                        </span>
                                    );
                                }
                            })()}
                            <span className="article-date">{each_article.pubDate}</span>
                        </div>
                    </div>
                )
                }
            </div>
        );
    }
}
