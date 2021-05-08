import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import FormCreateEditBrand from '../FormCreateEditBrand';
import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';

const BrandCreate = ({
    history
}) => {
    let [brand, setBrand] = useState({});
    //const [carModel, setCarModel] = useState(null);
    //const [carOwner, setCarOwner] = useState(null);
    //const [carEngineType, setCarEngineType] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(3);
console.log("aaa");
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { name } = e.target;
        
        const data = {
            'name' : name.value
        };

        createBrand(data);

        e.stopPropagation();
        
    };

    const createBrand = async (data) => {
        //console.log(data);
        try{
            await requester.dataSet.createEntity("brands", data)
            .then((res) => {
                if(res.status == 200){
                    setNotification('The brand is created!');
                    timeoutRedirect(history, `/brands`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    
                    //setNotification(res.message);
                    setNotification('The brand is not created!');
                }
            })
        }
        catch(e){
            setNotification('The brand is not created!');
        };
    }

    return (
        <section className = {style['container-brand-create']}>
            <article className = {style['brand-create']}>
                <Notification message={notification} />
                <FormCreateEditBrand formType="create" brand={brand} errors={errors} onSubmitHandler={onSubmitHandler}></FormCreateEditBrand>
            </article>
        </section>
    );
};

export default BrandCreate;