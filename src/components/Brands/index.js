import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Brand from '../Brand';
import SearchMenu from '../SearchMenu';

import {PageContext} from '../../ContextWrapper';

const Brands = () => {
    const numRecordsPerPage = 5;
    const [brands, setBrands] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(numRecordsPerPage);
    const [currentBrandItem, setCurrentBrandItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [hasCreateButton, setHasCreateButton] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(3);

    useEffect(() => {
        try{
            //getBrands(currentBrandItem);
            getBrands();
        }
        catch(e){
            setNotification('There are no brands!');
        };

    }, [currentBrandItem, isDeleted])
    
    const getBrands = () => {
        if(currentBrandItem != ''){
            requester.dataSet.getById('brands', currentBrandItem)
            .then(res => {
                setBrands([res]);
                setNotification('');
                setIsLoading(true);
                setCurrentBrandItem(currentBrandItem);
                setHasCreateButton(true);
            })
            .catch(() => {
                setIsLoading(true);
                setNotification('There are no result from the server!');
            });
        }
        else{
            requester.dataSet.getAll('brands')
            .then(res => {

                if(res.length > 0){
                    setBrands(res);
                    setNotification('');
                }
                else{
                    setBrands([]);
                    setNotification('There are no such brand!');
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
    }

    const searchBrandClickHandler = (id) => {
        setCurrentBrandItem(id);
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

            <SearchMenu currentBrandItem={currentBrandItem} searchBrandClickHandler={searchBrandClickHandler} isDeleted={isDeleted} 
            />

            {hasCreateButton
            ? 
            <div className={style['button-create-brand-wrapper']}>
                <Link to={`/brands/create`}><button>Add New Brand</button></Link>
            </div>
            : ''}

            {((!brands || brands.length == 0) && isLoading) ? (
                <h3 className={style['message']}>{notification}</h3>
            ) : '' }

            <h1>{!isLoading ? 'Loading...' : ``}</h1>
            
            <ul className={style['container-brands']}>
                
                {brands.slice(offset,limit).map((brand) => 
                    <Brand key={brand.id} brandObj={brand} setIsDeleted={setIsDeleted} currentBrandItem={currentBrandItem} setCurrentBrandItem={setCurrentBrandItem} />
                )}
            </ul>
            
            <div className={style['button-wraper-prev-next']}>
            {offset != 0 ? <button className={style['button-prev']} onClick={showPrevious}>Prev {numRecordsPerPage}</button> : ''}
            {limit < brands.length ? <button className={style['button-next']} onClick={showNext}>Next {numRecordsPerPage}</button> : ''}
            </div>
        </div>
    );
}

export default Brands;