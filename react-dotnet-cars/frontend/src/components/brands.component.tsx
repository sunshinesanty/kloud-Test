import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { IOwnerColor } from '../model/interfaces';
import CarOwnersService from '../store/cars.store';
import { OwnerColorComponent } from './owner.component';

export interface BrandProps {
    setError: (error: { message: string, show: boolean }) => void;
    setLoading: (isLoading: boolean) => void;
}

@observer
export class BrandComponent extends React.Component<BrandProps, {}> {
    @observable carBrands: string[] = [];
    constructor(props: BrandProps) {
        super(props);
        this.loadCars();
    }

    render() {
        let idx = 0;
        let carBrands = this.carBrands.map((car) => {
            return (
                <div key={idx++} className="panel panel-primary">
                    <div className="panel-heading">
                        <h4 className="panel-title">{car}</h4>
                    </div>
                    <OwnerColorComponent brandName={car} />
                </div>
            );
        });

        return (
            <div className="panel-group">
                {carBrands}
            </div>
        );
    }

    loadCars = async () => {
        this.props.setLoading(true);
        try {
            this.carBrands = await CarOwnersService.getCarBrands();
        } catch (error) {
            this.props.setError({
                message: `Unable to read cars data. Please contact your Aadministrator`,
                show: true
            });
        }
        this.props.setLoading(false);
    }

    public getOwnersForBrand = async (brandName: string): Promise<IOwnerColor[]> => {
        try {
            return await CarOwnersService.getOwnersByCarBrand(brandName);
        } catch (error) {
            this.props.setError({
                message: `Unable to read cars data. Please contact your Aadministrator`,
                show: true
            });
            return new Promise<any>((resolve, reject) => { reject('error getting brand owners'); });
        }
    }
}
