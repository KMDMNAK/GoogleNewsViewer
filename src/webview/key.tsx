import * as React from 'react';

export default class Key extends React.Component<{ action_key: string }>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div style={{fontSize:"10px",textAlign:"center"}}>
                {this.props.action_key}
            </div>
        );
    }
}

