declare interface IConfig {
    network: {
        baseEndPointUrl: string;
        useMockData: boolean;
        corsEnabled: boolean;
        userProxy: boolean;
        proxy : {
            baseEndPointUrl: string;
        }
    },
    apiEndpoints: {
        cars: string;
    }
}

declare const config: IConfig;
export default config;