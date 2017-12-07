import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cars-loader',
    templateUrl: './loading.component.html'
})

export class LoadingComponent {
    @Input() componentLoading: boolean;
    constructor() {
        this.componentLoading = false;
    }
}
