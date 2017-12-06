import config from '../common/config';

enum httpMethod {
    'GET',
    'POST'
}
export class CarsIO {
    public getData<T>(endpoint: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.fetchIt(httpMethod.GET, endpoint)
                .then((result: T) => resolve(result))
                .catch(reject);
        });
    }

    public postData<P, T>(endpoint: string, payload: P): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const bodyContent = JSON.stringify(payload);
            this.fetchIt(httpMethod.POST, endpoint, bodyContent)
                .then((result: T) => resolve(result))
                .catch(reject);
        });
    }

    private getHttpOption(method: httpMethod, body?: string) {
        const headers = new Headers();
        let httpOptions: RequestInit;

        headers.append('Access-Control-Allow-Origin', 'origin');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');
        httpOptions = {
            headers: headers,
            mode: (config.network.corsEnabled ? 'cors' : 'no-cors'),
            cache: 'default',
            method: httpMethod[method]
        };

        if (body) { httpOptions.body = body; }
        return httpOptions;
    }

    private async fetchIt(method: httpMethod, endPoint: string, body?: string) {
        try {
            const httpOptions = this.getHttpOption(method, body);
            const responce = await fetch(`${config.network.baseEndPointUrl}${endPoint}`, httpOptions);
            if (!responce.ok) {
                const err = await responce.json();
                return new Promise<any>((resolve, reject) => reject(err));
            }
            const result = await responce.json();
            return new Promise<any>((resolve) => resolve(result));
        } catch (err) {
            return new Promise<any>((resolve, reject) => reject(err));
        }
    }
}

export default new CarsIO();
