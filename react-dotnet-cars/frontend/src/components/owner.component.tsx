import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { IOwnerColor, IError } from '../model/interfaces';
import CarOwnersService from '../store/cars.store';
import { ErrorComponent } from './errors.component';

export interface OwnerProps {
    brandName: string;
}

@observer
export class OwnerColorComponent extends React.Component<OwnerProps, {}> {
    @observable owners: IOwnerColor[] = [];
    @observable showError: IError;
    @observable isLoading: Boolean = true;
    constructor(props: OwnerProps) { super(props); }

    componentWillMount() {
        this.showError = {
            show: false,
            message: '',
            onClose: this.hideError
        };
        this.loadOwners();
    }

    render() {
        let idx = 0;
        const ownerNames = this.owners.map((owner) => {
            idx++;
            return (
                <div key={idx} className="panel-collapse">
                    <div className="panel-body">{owner.name}</div>
                </div>
            );
        });
        return (
            <div>
                <ErrorComponent
                    message={this.showError.message}
                    show={this.showError.show}
                    onClose={this.showError.onClose}
                />
                {ownerNames}
            </div>
        );
    }

    public hideError = () => {
        this.showError.message = '';
        this.showError.show = false;
    }

    loadOwners = async () => {
        this.isLoading = true;
        try {
            this.owners = await CarOwnersService.getOwnersByCarBrand(this.props.brandName);
            this.owners = this.owners.filter((ownerColor) => ownerColor.name);
        } catch (error) {
            this.showError.message = 'Unable to get owner details. Please contact your administrator';
            this.showError.show = true;
        }
        this.isLoading = false;
    }
}
