import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import FormCreateEditModel from '../FormCreateEditModel';
import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';

const ModelCreate = ({
    history
}) => {
    let [model, setModel] = useState({});
    const [modelBrand, setModelBrand] = useState(null);
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(currentHeaderItem);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { name } = e.target;
        
        const data = {
            'name' : name.value,
            'brand' : modelBrand
        };

        createModel(data);

        e.stopPropagation();
        
    };

    const createModel = async (data) => {
        try{
            await requester.dataSet.createEntity("models", data)
            .then((res) => {
                if(res.status == 200){
                    setNotification('The model is created!');
                    timeoutRedirect(history, `/models`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    
                    //setNotification(res.message);
                    setNotification('The model is not created!');
                }
            })
        }
        catch(e){
            setNotification('The model is not created!');
        };
    }

    return (
        <section className = {style['container-model-create']}>
            <article className = {style['model-create']}>
                <Notification message={notification} />
                <FormCreateEditModel formType="create" model={model} errors={errors} setModelBrand={setModelBrand} onSubmitHandler={onSubmitHandler}></FormCreateEditModel>
            </article>
        </section>
    );
};

export default ModelCreate;