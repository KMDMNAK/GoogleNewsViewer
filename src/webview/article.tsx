/// <reference path="./App.tsx" />

import * as React from 'react';
import { ActionCommands, ActionContent } from '../action';
import Modal from '@material-ui/core/Modal';

export default class Article extends React.Component<{ articledatas: any[] }, { ModalConditions: any, KeyOfModalOpening: string | null }>{
    //vscode: VscodeNameSpace;
    constructor(props: any) {
        super(props);
        this.postData = this.postData.bind(this);
        //this.vscode.window.showInformationMessage("rendered article"
        // make modal conditions
        const ModalConditions: any = {};
        this.props.articledatas.forEach((each_article: any) => {
            ModalConditions[each_article.title as string] = false;
        });

        this.state = {
            ModalConditions: ModalConditions,
            KeyOfModalOpening: null
        };

        this.updateModalCondition = this.updateModalCondition.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

    }
    postData(url: string) {
        const action: ActionContent = {
            commandName: ActionCommands.searchQuery,
            value: `inurl:${url}`
        }
        //this.vscode.window.showInformationMessage("posted data")
        vscode.postMessage(action);
    }
    updateModalCondition(key: string) {
        const newModalConditions = this.state.ModalConditions;
        const KeyOfModalOpening = this.state.KeyOfModalOpening ? this.state.KeyOfModalOpening : key;
        newModalConditions[KeyOfModalOpening] = false;
        newModalConditions[key] = true;
        console.log(KeyOfModalOpening);

        this.setState({
            KeyOfModalOpening: KeyOfModalOpening,
            ModalConditions: newModalConditions
        });
    }
    makeNewModalCondition(key: string) {
        const newModalConditions = this.state.ModalConditions;
        newModalConditions[key] = false;
        this.setState({
            ModalConditions: newModalConditions
        });
    }
    handleModalClose(key: string) {
        if (key !== this.state.KeyOfModalOpening) {
            throw Error("miss match");
        }
        const newModalConditions = this.state.ModalConditions;
        newModalConditions[key] = false;
        this.setState({
            ModalConditions: newModalConditions,
            KeyOfModalOpening: null
        });
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
                {this.props.articledatas.map((each_article) => {
                    if (!each_article.title) {
                        return;
                    }
                    return (
                        <div className="article" key={each_article.title}>
                            <div className="article-title">
                                <a href={each_article.link}
                                    title={each_article.title}
                                >
                                    {each_article.title}
                                </a>
                            </div>
                            <div className="article-option">
                                <span className="article-date">{each_article.pubDate}</span>&ensp;&ensp;
                                <span className="relative-news">
                                    <a href=""
                                        title={each_article.title}
                                        onClick={(event: any) => {
                                            event.preventDefault();
                                            this.updateModalCondition(each_article.title);
                                            console.log("start modal");
                                        }}>
                                        relative news</a>
                                </span>&ensp;&ensp;
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.ModalConditions[each_article.title]}
                                    onClose={() => { this.handleModalClose(each_article.title); }}
                                >
                                    <div dangerouslySetInnerHTML={{
                                        __html: each_article.description
                                    }}>
                                    </div>
                                </Modal>
                                {(() => {
                                    if (each_article.source && each_article.source._) {
                                        return (
                                            <span className="media-name">
                                                <a href="" title={each_article.source.$.url} onClick={() => this.postData(each_article.source.$.url)}>
                                                    {each_article.source._}
                                                </a>
                                            </span>
                                        );
                                    }
                                })()}

                            </div>
                        </div>
                    )
                }
                )}
            </div>
        );
    }

}