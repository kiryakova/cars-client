import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';
import FormCreateEditBrand from '../FormCreateEditBrand';

const BrandEdit = ({
    match,
    history
}) => {
    let [brand, setBrand] = useState({});
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(3);

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
        try{
            await requester.dataSet.updateEntity("brands", data, id)
            .then((res) => {
                if(res.status === 200){
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

                    if(res.message.indexOf('[') >= 0)
                        setNotification('The brand is not edited!');
                    else
                        setNotification('The brand is not edited!' + res.message);
                    //setNotification('The brand is not edited!');
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