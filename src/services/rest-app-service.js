import { requestFactory } from './requests';
import { restApiUrl } from '../utils/rest-server-config';

//**Creates object that support CRUD operations over set of entities
const requester = (() => {
    let _dataSet;
    let restApiUrl;

    let init = (restApiUrlValue) => {
        restApiUrl = restApiUrlValue;
        _dataSet = requestFactory(restApiUrl);
    };

    return {
        init,
        get dataSet(){
            return _dataSet
        }
    };
})();

if(!requester.dataSet){
    requester.init(restApiUrl);
}

export default requester;
