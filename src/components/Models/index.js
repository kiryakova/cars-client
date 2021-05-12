import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Model from '../Model';
import SearchMenu from '../SearchMenu';

import {PageContext} from '../../ContextWrapper';

const Models = () => {
    const numRecordsPerPage = 5;
    const [models, setModels] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(numRecordsPerPage);
    const [currentBrandItem, setCurrentBrandItem] = useState('');
    const [currentModelItem, setCurrentModelItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [hasCreateButton, setHasCreateButton] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(4);

    useEffect(() => {
        try{
            getModels();
        }
        catch(e){
            setNotification('There are no models!');
        };

    }, [currentBrandItem, currentModelItem, isDeleted])
    
    const getModels = () => {

        requester.dataSet.getAll('models', currentBrandItem, currentModelItem)
        .then(res => {

            if(res.length > 0){
                setModels(res);
                setNotification('');
            }
            else{
                setModels([]);
                setNotification('There are no models by selected criteria!');
            }
            
            setIsLoading(true);
            setCurrentBrandItem(currentBrandItem);
            setHasCreateButton(true);
        })
        .catch(() => {
            setIsLoading(true);
            setNotification('There are no result from the server!');
        });

    }

    const searchBrandClickHandler = (id) => {
        setCurrentBrandItem(id);
        setCurrentModelItem('');
    }

    const searchModelClickHandler = (id) => {
        setCurrentModelItem(id);
    }

    const showPrevious = () => {
        setOffset(oldOfset => oldOfset - numRecordsPerPage);
        setLimit(offset);
    }

    const showNext = () => {
        setOffset(limit);
        setLimit(oldState => oldState + numRecordsPerPage);
    }

    return (
        <div className={style.container}>

            <SearchMenu currentBrandItem={currentBrandItem} searchBrandClickHandler={searchBrandClickHandler} 
                        searchModelClickHandler={searchModelClickHandler} isDeleted={isDeleted} 
            />

            {hasCreateButton
            ? 
            <div className={style['button-create-model-wrapper']}>
                <Link to={`/models/create`}><button>Add New Model</button></Link>
            </div>
            : ''}

            {((!models || models.length == 0) && isLoading) ? (
                <h3 className={style['message']}>{notification}</h3>
            ) : '' }

            <h1>{!isLoading ? 'Loading...' : ``}</h1>
            
            <ul className={style['container-models']}>
                
                {models.slice(offset,limit).map((model) => 
                    <Model key={model.id} modelObj={model} setIsDeleted={setIsDeleted} currentModelItem={currentModelItem} setCurrentModelItem={setCurrentModelItem} />
                )}
            </ul>
            
            <div className={style['button-wraper-prev-next']}>
            {offset != 0 ? <button className={style['button-prev']} onClick={showPrevious}>Prev {numRecordsPerPage}</button> : ''}
            {limit < models.length ? <button className={style['button-next']} onClick={showNext}>Next {numRecordsPerPage}</button> : ''}
            </div>
        </div>
    );
}

export default Models;