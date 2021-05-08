import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import { Link } from 'react-router-dom';

import FormCreateEditCar from '../FormCreateEditCar';
/*import FormInput from '../FormInput';
import FormDropdown from '../FormDropdown';
import FormErrorField from '../FormErrorField';
*/
import Notification from '../Notification';
import { Fragment } from 'react';

import {PageContext} from '../../ContextWrapper';
import FormCreateEditBrand from '../FormCreateEditBrand';

const BrandEdit = ({
    match,
    history
}) => {
    let [brand, setBrand] = useState({});
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    //const [brands, setBrands] = useState([]);
    //const [models, setModels] = useState([]);
    //const [currentBrandId, setCurrentBrandId] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(currentHeaderItem);

    useEffect(async() => {

        await requester.dataSet.getById('brands', match.params.id)
            .then(res => {
                setBrand(res);
            })
            .catch(() => {
                setNotification('The brand is not found!');
            });

    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { name } = e.target;
        
        const data = {
            'name' : name.value
        };

        editBrand(data, match.params.id);

        e.stopPropagation();
        
    };

    const editBrand = async (data, id) => {
        //console.log(data);
        try{
            await requester.dataSet.updateEntity("brands", data, id)
            .then((res) => {
                if(res.status == 200){
                    setNotification('The brand is edited!');
                    timeoutRedirect(history, `/brands`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    //console.log(errors);
                    setNotification('The brand is not edited!');
                }
            })
        }
        catch(e){
            setNotification('The brand is not edited!');
        };
    }

    return (
        <section className = {style['container-car-edit']}>
            <article className = {style['car-edit']}>
                <Notification message={notification} />
                <FormCreateEditBrand formType="edit" brand={brand} errors={errors} onSubmitHandler={onSubmitHandler}></FormCreateEditBrand>
            </article>
        </section>
    );
};

export default BrandEdit;