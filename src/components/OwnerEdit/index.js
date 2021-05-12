import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';
import FormCreateEditOwner from '../FormCreateEditOwner';

const OwnerEdit = ({
    match,
    history
}) => {
    const [owner, setOwner] = useState({});
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(5);

    useEffect(async() => {

        await requester.dataSet.getById('owners', match.params.id)
            .then(res => {
                setOwner(res);
            })
            .catch(() => {
                setNotification('The owner is not found!');
            });

    }, []);

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

        editOwner(data, match.params.id);

        e.stopPropagation();
        
    };

    const editOwner = async (data, id) => {
        try{
            await requester.dataSet.updateEntity("owners", data, id)
            .then((res) => {
                if(res.status === 200){
                    setNotification('The owner is edited!');
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
                        setNotification('The owner is not edited!');
                    else
                        setNotification('The owner is not edited!' + res.message);
                    //setNotification('The owner is not edited!');
                }
            })
        }
        catch(e){
            setNotification('The owner is not edited!');
        };
    }

    return (
        <section className = {style['container-owner-edit']}>
            <article className = {style['owner-edit']}>
                <Notification message={notification} />
                <FormCreateEditOwner formType="edit" owner={owner} errors={errors} onSubmitHandler={onSubmitHandler}></FormCreateEditOwner>
            </article>
        </section>
    );
};

export default OwnerEdit;