import * as React from 'react';
import { ActionCommands ,ActionContent} from '../action';
import { VscodeNameSpace } from './App'

export default class Article extends React.Component<{ articledatas: any[], vscode: VscodeNameSpace }>{
    vscode: VscodeNameSpace;
    constructor(props: any) {
        super(props);
        this.vscode = props.vscode;
        this.postData = this.postData.bind(this);
        //this.vscode.window.showInformationMessage("rendered article")
    }
    postData(url: string) {
        const action: ActionContent = {
            commandName: ActionCommands.searchQuery,
            value:`site:${url}`
        }
        //this.vscode.window.showInformationMessage("posted data")
        this.vscode.postMessage(action);
    }
    render() {
        return (
            <div>
                <style>
                    {`
                    .article {
                        padding: 10px
                    }
                    .title {
                        font-size: 20px
                    }
                `}
                </style>
                {this.props.articledatas.map((each_article) =>
                    <div className="article">
                        <a className="title" href={each_article.link} >{each_article.title}</a>
                        <div>
                            {(() => {
                                if (each_article.source && each_article.source._) {
                                    return <span><a href="" onClick={()=>this.postData(each_article.source.$.url)}>{each_article.source._}</a>&ensp;&ensp;</span>;
                                }
                            })()}
                            <span>{each_article.pubDate}</span>
                        </div>
                    </div>
                )
                }
            </div>
        );
    }
}
