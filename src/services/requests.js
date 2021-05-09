export const requestFactory = (restApiUrl) => {
    if (!restApiUrl) {
        throw new Error('You must provide rest api key');
    }
    
    if (!restApiUrl.endsWith('/')) {
        restApiUrl = restApiUrl + '/';
    }

    const getEnumValues = (table, enumeration) => {
        let params = table + '/?enumeration=' + enumeration;

        return fetch(restApiUrl + params, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(x => x.json());
    };

    const getAll = (table, brandId = '', modelId ='', ownerId = '') => {
        let params = table + '/all/';

        if((table == "cars") || (table == "models")){
            params = params + '?brandId=' + brandId + '&modelId=' + modelId;
        }
        else if(table == "brands"){
            params = params + '?brandId=' + brandId;
        }
        else if(table == "owners"){
            params = params + '?ownerId=' + ownerId;
        }

        return fetch(restApiUrl + params, {
            method: 'GET',
            //mode: 'no-cors',
            //Accept: "application/json",
            headers: { 'Content-Type': 'application/json' }
        }).then(x => x.json());
        /*.then((data) => data);*/
    };

    const getById = (table, id) => {
        let params = table + '/?id=' + id;

        return fetch(restApiUrl + params).then(x => x.json());
    };

    const createEntity = (table, entityBody) => {
        let params = table + '/create';
        return fetch(restApiUrl + params, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entityBody)
        }).then(x => {
            if(x.status != 200)
                return x.json();
            else
                return x;
        });
        //.then(x => x.json());
        
    };

    const updateEntity = (table, entityBody, id) => {
        let params = table + '/update/?id=' + id;
//console.log(entityBody);
        return fetch(restApiUrl + params, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entityBody)
        }).then(x => {
            if(x.status != 200)
                return x.json();
            else
                return x;
        });
    };

    const patchEntity = (entityBody, id) => {
        return fetch(`${restApiUrl}/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(entityBody)
        }).then(x => x.json());
    };

    const deleteEntity = (table, id) => {
        let params = table + '/delete/?id=' + id;

        return fetch(restApiUrl + params, {
            method: 'DELETE'
        });
    };

    return {
        getEnumValues,
        getAll,
        getById,
        createEntity,
        updateEntity,
        patchEntity,
        deleteEntity
    };
};