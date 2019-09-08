import * as React from 'react';

export default class Article extends React.Component<{ articledatas: any[] }>{
    constructor(props: any) {
        super(props);
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
                                    return <span>{each_article.source._}・</span>;
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
