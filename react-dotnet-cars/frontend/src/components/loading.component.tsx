import * as React from 'react';
import { observer } from 'mobx-react';
const loading = require('../assets/images/loading-bars.svg');

export interface LoadingProps {
    componentLoading: boolean;
}

@observer
export class LoadingComponent extends React.Component<LoadingProps, {}> {

    constructor(props: LoadingProps) {
        super(props);
    }

    render() {
        return (
            <div className="splash" hidden={!this.props.componentLoading}>
                <div className="color-line" />
                <div className="splash-title">
                    <img src={loading} width="64" height="64" />
                </div>
            </div>
        );
    }
}
