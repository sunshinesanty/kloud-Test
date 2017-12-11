import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { IOwnerColor } from '../model/interfaces';
import CarOwnersService from '../store/cars.store';

export interface OwnerProps {
    brandName: string;
}

@observer
export class OwnerColorComponent extends React.Component<OwnerProps, {}> {
    @observable owners: IOwnerColor[] = [];
    @observable isLoading: Boolean = true;
    constructor(props: OwnerProps) {
        super(props);
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
                {ownerNames}
            </div>
        );
    }

    loadOwners = async () => {
        this.isLoading = true;
        try {
            this.owners = await CarOwnersService.getOwnersByCarBrand(this.props.brandName);
            this.owners = this.owners.filter((ownerColor) => ownerColor.name);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
        this.isLoading = false;
    }
}
