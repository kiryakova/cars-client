//import {CATEGORIES_MENU_ITEMS } from '../NavigationCategories/CategoriesMenuItems';

import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
//import {List} from 'react-virtualized';

import Notification from '../Notification';

import Brand from '../Brand';
import SearchMenu from '../SearchMenu';

import {PageContext} from '../../ContextWrapper';

const Brands = () => {
    const numRecordsPerPage = 5;
    const [brands, setBrands] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(numRecordsPerPage);
    const [currentBrandItem, setCurrentBrandItem] = useState('');
    
    //const [currentModelItem, setCurrentModelItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [hasCreateButton, setHasCreateButton] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(3);

    useEffect(() => {
        try{
            getBrands(currentBrandItem);
        }
        catch(e){
            setNotification('There are no brands!');
        };

    }, [currentBrandItem, isDeleted])
    
    const getBrands = (currentBrandItem) => {

        requester.dataSet.getAll('brands', currentBrandItem)
        .then(res => {

            if(res.length > 0){
                //console.log(res);
                setBrands(res);
                setNotification('');
            }
            else{
                setBrands([]);
                setNotification('There are no such brand!');
            }
            
            setIsLoading(true);
            //setCurrentBrand(brand);
            setCurrentBrandItem(currentBrandItem);
            setHasCreateButton(true);
        })
        .catch(() => {
            setIsLoading(true);
            setNotification('There are no result from the server!');
            //history.push(`/error`);
        });

    }

    const searchBrandClickHandler = (id) => {
        setCurrentBrandItem(id);
        //console.log(currentBrandItem);
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
            />

            {hasCreateButton
            ? 
            <div className={style['button-create-car-wrapper']}>
                <Link to={`/brands/create`}><button>Add New Brand</button></Link>
            </div>
            : ''}

            {((!brands || brands.length == 0) && isLoading) ? (
                <h3 className={style['message']}>{notification}</h3>
            ) : '' }

            <h1>{!isLoading ? 'Loading...' : ``}</h1>
            
            <ul className={style['container-cars']}>
                
                {brands.slice(offset,limit).map((brand) => 
                    <Brand key={brand.id} brandObj={brand} categoryId={currentBrandItem} setIsDeleted={setIsDeleted} />
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