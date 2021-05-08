//import {CATEGORIES_MENU_ITEMS } from './CategoriesMenuItems';

import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';

import FormDropdown from '../FormDropdown';

const SearchMenu = ({
    currentBrandItem,
    searchBrandClickHandler,
    searchModelClickHandler
}) => {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getBrands();
        if(searchModelClickHandler != undefined)
            getModels(currentBrandItem);
        //(currentBrandItem != {} && currentBrandItem != null && currentBrandItem != '') ? getModels(currentBrandItem) : setModels([]);
    }, [currentBrandItem])

    const getBrands = () => {
        
        requester.dataSet.getAll('brands')
        .then(res => {
            if(res.length > 0){
                setBrands(res);
            }
            else{
                setBrands([]);
            }
        })
        .catch(() => {
            console.log('There are no result from the server!');
        });

    }

    const getModels = (currentBrandItem) => {
        
        requester.dataSet.getAll('models', currentBrandItem)
        .then(res => {
            if(res.length > 0){
                setModels(res);
            }
            else{
                setModels([]);
            }
        })
        .catch(() => {
            console.log('There are no result from the server!');
        });

    }

    return (
            <article className={style['container-menu']}>
                <FormDropdown
                        name="brand" 
                        id="brand" 
                        label='Brand' 
                        options={brands} 
                        canBeEmpty={true} 
                        handleChange={searchBrandClickHandler} 
                />

                {(searchModelClickHandler != undefined) 
                ? <FormDropdown
                    name="model" 
                    id="model" 
                    label='Model' 
                    options={models} 
                    canBeEmpty={true} 
                    handleChange={searchModelClickHandler} 
                />
                : ''}
                
            </article>
    );
};

export default SearchMenu;