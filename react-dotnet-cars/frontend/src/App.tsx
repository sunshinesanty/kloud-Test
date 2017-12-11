import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { LoadingComponent, ErrorComponent, BrandComponent } from './components';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/loading-bars.css';
import './assets/css/riliwan-rabo.css';
import { IError } from './model/interfaces';

@observer
class App extends React.Component<{}, {}> {
  @observable title: string = 'Cars & OWners';
  @observable isLoading: boolean = true;
  @observable showError: IError;
  constructor(props: any) {
    super(props);
    this.showError = { message: '', show: false, onClose: this.hideError };
  }

  render() {
    return (
      <div className="conatiner">
        <div className="col-sm-6 col-sm-offset-1 col-xs-9 col-xs-offset-1">
          <h1>{this.title}</h1>
          <LoadingComponent componentLoading={this.isLoading} />
          <ErrorComponent
            message={this.showError.message}
            show={this.showError.show}
            onClose={this.showError.onClose}
          />
          <BrandComponent setError={this.setError} setLoading={this.setLoading} />
        </div>
      </div>
    );
  }

  public setError = (error: { message: string, show: boolean }) => {
    this.showError.message = error.message;
    this.showError.show = error.show;
  }

  public setLoading = (loadStatus: boolean) => {
    this.isLoading = loadStatus;
  }

  public hideError = () => {
    this.showError.message = '';
    this.showError.show = false;
  }
}

export default App;
