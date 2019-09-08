import * as React from 'react';

export default class Key extends React.Component<{ key: string }>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.key}
            </div>
        );
    }
}

