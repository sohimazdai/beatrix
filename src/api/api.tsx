export class Api {
    apiAddress = 'http://localhost:7000';

    sendGet(params: any) {
        return new Promise(resolve => {
            setTimeout(() => {
                return resolve()
            }, 1000)
        })
    }
}
