import * as React from 'react';
import { observer } from 'mobx-react';

import { IError } from '../model/interfaces';

@observer
export class ErrorComponent extends React.Component<IError, {}> {

    constructor(props: IError) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="alert alert-danger" hidden={!this.props.show}>
                    <button type="button" className="close" onClick={this.props.onClose}>&times;</button>
                    <strong>Error:</strong> {this.props.message}
                </div>
            </div>
        );
    }
}
