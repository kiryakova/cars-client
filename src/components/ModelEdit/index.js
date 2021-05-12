import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import FormCreateEditModel from '../FormCreateEditModel';

import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';

const ModelEdit = ({
    match,
    history
}) => {
    let [model, setModel] = useState({});
    const [modelBrand, setModelBrand] = useState(null);
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(4);

    useEffect(() => {

            requester.dataSet.getById('models', match.params.id)
            .then(res => {
                setModel(res);
                setModelBrand(res.brand);
            })
            .catch(() => {
                setNotification('The car is not found!');
            });

    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { name } = e.target;
        
        const data = {
            'name' : name.value,
            'brand' : modelBrand
        };

        editModel(data, match.params.id);

        e.stopPropagation();
        
    };

    const editModel = async (data, id) => {
        try{
            await requester.dataSet.updateEntity("models", data, id)
            .then((res) => {
                if(res.status === 200){
                    setNotification('The model is edited!');
                    timeoutRedirect(history, `/models`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    
                    if(res.message.indexOf('[') >= 0)
                        setNotification('The model is not edited!');
                    else
                        setNotification('The model is not edited!' + res.message);
                    //setNotification('The model is not edited!');
                }
            })
        }
        catch(e){
            setNotification('The model is not edited!');
        };
    }

    return (
        <section className = {style['container-model-edit']}>
            <article className = {style['model-edit']}>
                <Notification message={notification} />
                <FormCreateEditModel formType="edit" model={model} errors={errors} setModelBrand={setModelBrand} onSubmitHandler={onSubmitHandler}></FormCreateEditModel>
            </article>
        </section>
    );
};

export default ModelEdit;