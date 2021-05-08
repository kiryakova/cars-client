//import {CATEGORIES_MENU_ITEMS } from '../NavigationCategories/CategoriesMenuItems';

import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
//import {List} from 'react-virtualized';

import Notification from '../Notification';

import Car from '../Car';
import SearchMenu from '../SearchMenu';

import {PageContext} from '../../ContextWrapper';

const Cars = ({
    history,
    match
}) => {
    const numRecordsPerPage = 5;
    const [cars, setCars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(numRecordsPerPage);
    const [currentBrandItem, setCurrentBrandItem] = useState('');
    //const [currentBrand, setCurrentBrand] = useState('');
    const [currentModelItem, setCurrentModelItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [hasCreateButton, setHasCreateButton] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(currentHeaderItem);

    useEffect(() => {
        try{
            //getCars(currentBrandItem, currentModelItem);
            getCars();
        }
        catch(e){
            setNotification('There are no cars!');
        };

    }, [currentBrandItem, currentModelItem, isDeleted])
    
    const getCars = () => {

        requester.dataSet.getAll('cars', currentBrandItem, currentModelItem)
        .then(res => {

            if(res.length > 0){
                //console.log(res);
                setCars(res);
                setNotification('');
            }
            else{
                setCars([]);
                setNotification('There are no cars by selected brand and model!');
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
        setCurrentModelItem('');
        //console.log(currentBrandItem);
    }

    const searchModelClickHandler = (id) => {
        setCurrentModelItem(id);
    }

    const showPreviousCars = () => {
        setOffset(oldOfset => oldOfset - numRecordsPerPage);
        setLimit(offset);
    }

    const showNextCars = () => {
        setOffset(limit);
        setLimit(oldState => oldState + numRecordsPerPage);
    }

    return (
        <div className={style.container}>

            <SearchMenu currentBrandItem={currentBrandItem} searchBrandClickHandler={searchBrandClickHandler} 
                        searchModelClickHandler={searchModelClickHandler}
            />

            {hasCreateButton
            ? 
            <div className={style['button-create-car-wrapper']}>
                <Link to={`/cars/create`}><button>Add New Car</button></Link>
            </div>
            : ''}

            {((!cars || cars.length == 0) && isLoading) ? (
                <h3 className={style['message']}>{notification}</h3>
            ) : '' }

            <h1>{!isLoading ? 'Loading...' : ``}</h1>
            
            <ul className={style['container-cars']}>
                
                {cars.slice(offset,limit).map((car) => 
                    <Car key={car.id} carObj={car} categoryId={currentBrandItem} setIsDeleted={setIsDeleted} />
                )}
            </ul>
            
            <div className={style['button-wraper-prev-next']}>
            {offset != 0 ? <button className={style['button-prev']} onClick={showPreviousCars}>Prev {numRecordsPerPage}</button> : ''}
            {limit < cars.length ? <button className={style['button-next']} onClick={showNextCars}>Next {numRecordsPerPage}</button> : ''}
            </div>
        </div>
    );
}

export default Cars;