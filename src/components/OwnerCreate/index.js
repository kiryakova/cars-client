import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import FormCreateEditOwner from '../FormCreateEditOwner';
import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';

const OwnerCreate = ({
    history
}) => {
    const [owner] = useState({});
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(5);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { firstName, lastName, egn, address, phone } = e.target;
        
        const data = {
            'firstName' : firstName.value,
            'lastName' : lastName.value,
            'egn' : egn.value,
            'address' : address.value,
            'phone' : phone.value
        };

        createOwner(data);

        e.stopPropagation();
        
    };

    const createOwner = async (data) => {
        try{
            await requester.dataSet.createEntity("owners", data)
            .then((res) => {
                if(res.status === 200){
                    setNotification('The owner is created!');
                    timeoutRedirect(history, `/owners`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    
                    if(res.message.indexOf('[') >= 0)
                        setNotification('The owner is not created!');
                    else
                        setNotification('The owner is not created!' + res.message);
                    //setNotification('The owner is not created!');
                }
            })
        }
        catch(e){
            setNotification('The owner is not created!');
        };
    }

    return (
        <section className = {style['container-owner-create']}>
            <article className = {style['owner-create']}>
                <Notification message={notification} />
                <FormCreateEditOwner formType="create" owner={owner} errors={errors} onSubmitHandler={onSubmitHandler}></FormCreateEditOwner>
            </article>
        </section>
    );
};

export default OwnerCreate;