import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Owner from '../Owner';
import SearchMenu from '../SearchMenu';

import {PageContext} from '../../ContextWrapper';

const Owners = () => {
    const numRecordsPerPage = 5;
    const [owners, setOwners] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(numRecordsPerPage);
    const [currentOwnerItem, setCurrentOwnerItem] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [hasCreateButton, setHasCreateButton] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(5);

    useEffect(() => {
        try{
            getOwners();
        }
        catch(e){
            setNotification('There are no owners!');
        };

    }, [currentOwnerItem, isDeleted])
    
    const getOwners = () => {

        requester.dataSet.getAll('owners', currentOwnerItem)
        .then(res => {

            if(res.length > 0){
                setOwners(res);
                setNotification('');
            }
            else{
                setOwners([]);
                setNotification('There are no such owner!');
            }
            
            setIsLoading(true);
            setCurrentOwnerItem(currentOwnerItem);
            setHasCreateButton(true);
        })
        .catch(() => {
            setIsLoading(true);
            setNotification('There are no result from the server!');
        });

    }

    const searchOwnerClickHandler = (id) => {
        setCurrentOwnerItem(id);
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

            <SearchMenu currentOwnerItem={currentOwnerItem} searchOwnerClickHandler={searchOwnerClickHandler} 
            />

            {hasCreateButton
            ? 
            <div className={style['button-create-owner-wrapper']}>
                <Link to={`/owners/create`}><button>Add New Owner</button></Link>
            </div>
            : ''}

            {((!owners || owners.length == 0) && isLoading) ? (
                <h3 className={style['message']}>{notification}</h3>
            ) : '' }

            <h1>{!isLoading ? 'Loading...' : ``}</h1>
            
            <ul className={style['container-owners']}>
                
                {owners.slice(offset,limit).map((owner) => 
                    <Owner key={owner.id} ownerObj={owner} setIsDeleted={setIsDeleted} />
                )}
            </ul>
            
            <div className={style['button-wraper-prev-next']}>
            {offset != 0 ? <button className={style['button-prev']} onClick={showPrevious}>Prev {numRecordsPerPage}</button> : ''}
            {limit < owners.length ? <button className={style['button-next']} onClick={showNext}>Next {numRecordsPerPage}</button> : ''}
            </div>
        </div>
    );
}

export default Owners;