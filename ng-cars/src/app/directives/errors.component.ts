import { Component, Input } from '@angular/core';

import { IError } from '../../model/interfaces';

@Component({
    selector: 'app-cars-error',
    templateUrl: './errors.component.html'
})

export class ErrorComponent implements IError {
    @Input() message: string;
    @Input() show: boolean;
    @Input() onClose: () => void;
    constructor() {
        this.message = '';
        this.show = false;
    }
}
